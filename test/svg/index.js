var fs = require('fs');
var svgParse = require('svg-parser');
var parseSVG = require('svg-path-parser');
var convert = require('xml-js');

const xml = fs.readFileSync(__dirname + '/assets/SVGTemplate.plist', 'utf-8');
const xmlJson = JSON.parse(convert.xml2json(xml, {compact: true, spaces: 4}));
const regular = xmlJson.plist.dict.dict;
const regularTadios = regular.key.map(item => {
  if (item._text == 'square') {
    item._text = '1:1';
  } 
  return item._text;
});
// console.log(regularTadios);
const svgsTadio = {};
regular.array.forEach((item, index) => {
  const dicts = item.dict;
  if (Object.prototype.toString.call(dicts) == '[object Array]') {
    dicts.forEach(dict => {
      svgsTadio[dict.string[0]._text] = regularTadios[index];
    });
  } else {
    svgsTadio[dicts.string[0]._text] = regularTadios[index];
  }
});
// console.log(svgsTadio);

const datas = [];
let svgFilenames = fs.readdirSync(__dirname + '/assets');
svgFilenames = svgFilenames.filter(filename => filename.includes('.svg')); 
console.log('svgFilenames', svgFilenames.length);
svgFilenames.slice(359, 360).forEach(filename => {
  parsSVGFun(filename);
});
console.log('datas', datas.length);
fs.writeFileSync(__dirname + '/templare.txt', JSON.stringify(datas));

// parsSVGFun('R_04_A_0_v3-37.svg');
function parsSVGFun(filename) {
  let svgImage = fs.readFileSync(__dirname + '/assets/' + filename, 'utf-8');
  
  const parsed = svgParse.parse(svgImage);
  const svg = parsed.children[0];
  // console.log('svg', svg);
  
  const viewBox = svg.properties.viewBox;
  // console.log('viewBox', viewBox);
  const [minX, minY, width, height] = viewBox.split(' ');
  const svgWidth = width - minX;
  const svgHeight = height - minY;
  
  const shapes = [];
  let svgChildren = svg.children;
  // console.log('svgChildren', svgChildren);
  
  const getSVGElement = (childrens) => {
    childrens.forEach(children => {
      if (children.tagName === 'g') {
        getSVGElement(children.children);
      } else {
        parseSVGElement(children, svgWidth, svgHeight, shapes);
      }
    });
  };
  
  getSVGElement(svgChildren);

  // console.log('shapes', shapes);
  // fs.writeFileSync(__dirname + '/templare.js', JSON.stringify({outerBorder: 0, innerBorder: 0, borderRadius: 0, shapes}));
  const ratioKey = filename.replace(/.svg$/gi, '');
  let ratio = '';
  if (ratioKey) {
    if (svgsTadio[ratioKey]) {
      ratio = svgsTadio[ratioKey];
    }
  }
  datas.push({
    filename, 
    ratio: ratio,
    count: shapes.length,
    outerBorder: 0, 
    innerBorder: 0, 
    borderRadius: 0, 
    shapes
  })
}

function parseSVGElement(element, svgWidth, svgHeight, shapes) {
  const { tagName } = element;
  if (tagName === 'rect') {
    let { x, y, width, height} = element.properties;
    if (!x) x = 0;
    if (!y) y = x;
    x /= svgWidth;
    y /= svgHeight;
    width /= svgWidth;
    height /= svgHeight;
    const points = [
      {
        x: x,
        y: y
      },
      {
        x: x + width,
        y: y
      },
      {
        x: x + width,
        y: y + height
      },
      {
        x: x,
        y: y + height
      }
    ]
    shapes.push({ tagName, points });
  } else if (tagName === 'path') {
    let { d } = element.properties;
    d = parseSVG(d);
    // console.log('d', d);
    
    let relativePoint = null;
    d.forEach((point, index) => {
      if (point.code === 'M') {
        relativePoint = { x: point.x, y: point.y };
      } else if (['L', 'l'].includes(point.code)) {
        if (point.code === 'L') {
          relativePoint = { x: point.x, y: point.y };
        } else if (point.code === 'l') {
          const { x, y } = relativePoint;
          relativePoint = { x: x + point.x, y: y + point.y };
          point.code = 'L';
          point.x = relativePoint.x;
          point.y = relativePoint.y;
        }
      } else if (['V', 'v'].includes(point.code)) {
        const { x, y } = relativePoint;
        if (point.code === 'V') {
          relativePoint = { x: x, y: point.y };
          point.code = 'L';
          point.x = x;
        } else if (point.code === 'v') {
          relativePoint = { x: x, y: y + point.y };
          point.code = 'L';
          point.x = x;
          point.y = relativePoint.y;
        }
      } else if (['H', 'h'].includes(point.code)) {
        const { x, y } = relativePoint;
        if (point.code === 'H') {
          relativePoint = { x: point.x, y: y };
          point.code = 'L';
          point.y = y;
        } else if (point.code === 'h') {
          relativePoint = { x: x + point.x, y: y };
          point.code = 'L';
          point.x = relativePoint.x;
          point.y = y;
        }
      } else if (point.code === 'C') {
        relativePoint = { x: point.x, y: point.y }
      } else if (point.code === 'c') {
        const { x, y } = relativePoint;
        relativePoint = { x: x + point.x, y: y + point.y };
        point.code = 'C';
        point.x1 += x;
        point.y1 += y;
        point.x2 += x;
        point.y2 += y;
        point.x = relativePoint.x;
        point.y = relativePoint.y;
      } else if (['S', 's'].includes(point.code)) {
        const prePoint = d[index - 1];
        const { code, x2, y2, x: _x , y: _y } = prePoint;
        const _x1 = _x - x2;
        const _y1 = _y - y2;
        const { x, y } = relativePoint;
        if (['S', 's', 'C', 'c'].includes(code)) {
          if (point.code === 's') {
            relativePoint = { x: x + point.x, y: y + point.y };
            point.code = 'C';
            point.x1 = x + _x1;
            point.y1 = y + _y1;
            point.x2 += x;
            point.y2 += y;
            point.x = relativePoint.x;
            point.y = relativePoint.y;
          } else if (point.code === 'S') {
            relativePoint = { x: point.x, y: point.y };
            point.code = 'C';
            point.x1 = x + _x1;
            point.y1 = y + _y1;
          }
        } else {
          if (point.code === 's') {
            relativePoint = { x: x + point.x, y: y + point.y };
            point.code = 'C';
            point.x2 += x;
            point.y2 += y;
            point.x1 = point.x2;
            point.y1 = point.y2;
            point.x = relativePoint.x;
            point.y = relativePoint.y;
          } else if (point.code === 'S') {
            relativePoint = { x: point.x, y: point.y };
            point.code = 'C';
            point.x1 = point.x2;
            point.y1 = point.y2;
          }
        }
      }
      if (point.x) point.x /= svgWidth;
      if (point.x1) point.x1 /= svgWidth;
      if (point.x2) point.x2 /= svgWidth;
      if (point.y) point.y /= svgHeight;
      if (point.y1) point.y1 /= svgHeight;
      if (point.y2) point.y2 /= svgHeight;
    })
    // console.log('d', d);
    shapes.push({ tagName, points: d });
  } else if (tagName === 'polygon') {
    let { points } = element.properties;
    points = points.split(' ')
      .filter(point => {
        return point.length > 1;
      })
      .map(point => {
        let [x, y] = point.split(',');
        x /= svgWidth;
        y /= svgHeight;
        return { x, y };
      });
    // console.log('points', points);
    shapes.push({ tagName, points });
  } else if (tagName === 'circle') {
    let { cx, cy, r } = element.properties;
    cx /= svgWidth;
    cy /= svgHeight;
    r /= svgWidth;
    shapes.push({ tagName, x: cx, y: cy, r });
  }
}






// var d="M105,316H4V215.323h101V316z M105,210.339H4V109.661h101V210.339z M105,104.677H4V4h101V104.677z M210.501,316h-101V215.323h101V316z M210.501,210.339h-101V109.661h101V210.339z M210.501,104.677h-101V4h101V104.677zM316,316H215V215.323h101V316z M316,210.339H215V109.661h101V210.339z M316,104.677H215V4h101V104.677z";
// var d="M84.905,40.394c44.357-0.821,75.093,44.284,75.093,44.284s37.613-44.373,77.104-44.373c39.486,0,57.128,51.918,57.128,74.538c0,76.041-134.229,164.551-134.229,164.551s-134.23-88.511-134.23-164.552C25.768,94.032,40.548,41.214,84.905,40.394z";
// console.log(parseSVG(d));