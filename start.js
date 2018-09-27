console.log('test');

var net = require('net');
var EscPos = require('./index.js').EscPos;

const client = new net.Socket();
client.connect(9100, '192.168.60.45', () => {

    const buffer = EscPos.getBufferFromTemplate(xml, data);
    console.log('write data');
    client.write(buffer);
    client.write('\xFA',()=>{
        client.end();
        client.destroy();
        console.log('end write');
    })
})

client.setKeepAlive(true, 20000);

const data = {
    title: 'Tile',
    subtitle: 'Subtitle',
    description: 'This is a description',
    date: new Date(),
    price: 1.99,
    paddedString: '&nbsp;&nbsp;&nbsp;&nbsp;Line padded with 4 spaces',
    condictionA: false,
    condictionB: true,
    barcode: '12345678',
    qrcode: 'hello qrcode',
    underline: 'underline'
  }

const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <document>
      <line-feed />
      <align mode="center">
          <bold>
              <text-line size="1:1">{{title}}</text-line>
          </bold>
          <line-feed />
          <small>
              <text-line>{{subtitle}}</text-line>
          </small>
      </align>
      <small>
          <text-line>Date: {{moment date format="DD/MM/YYYY HH:mm:ss"}}</text-line>
          <text-line size="1:0">{{numeral price format="$ 0,0.00"}}</text-line>
          <text-line size="1:0">{{paddedString}}</text-line>
      </small>
      <line-feed />
      <underline>
        <text-line>{{underline}}</text-line>
      </underline>
      <line-feed />
      <align mode="center">
          <white-mode>
              <text-line size="1:1">{{description}}</text-line>
          </white-mode>
          <line-feed />
          <bold>
              {{#if condictionA}}
              <text-line size="1:0">True A</text-line>
              {{else if condictionB}}
              <text-line size="1:0">True B</text-line>
              {{else}}
              <text-line size="1:0">False</text-line>
              {{/if}}
          </bold>
      </align>
      <line-feed />
      <align mode="center">
          <barcode system="CODE_39" width="DOT_250">{{barcode}}</barcode>
      </align>
      <line-feed />
    <paper-cut/>
  </document>
`;
