var mousewheel=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
        // variable and global config
        var padding = [10, 10, 10, 10]; // top, right, bottom, left
        var stageWidth = 480;
        var stageHeight = 320;
        var seatWidth = 20;
        var seatHeight = 20;
        var seatRow = 10;
        var seatColumn = 24;
        var seatTotalWidth = seatWidth * seatColumn;
        var seatTotalHeight = seatHeight * seatRow;

        var scale = 1;
        var defaultScale = (seatTotalWidth >= seatTotalHeight) ? (stageWidth/seatTotalWidth) * 0.9 : (stageHeight/seatTotalHeight) * 0.9 ;
        var defaultOffsetX = (stageWidth - seatTotalWidth * defaultScale)/2; // for stage align center
        var minScale = 0.3;
        var maxScale = 2.5;
        var hoverSeatId = '';
        // stage
        var stage = new Kinetic.Stage({
          container: 'container',
          width: stageWidth,
          height: stageHeight,
          draggable: true,
          scale: defaultScale,
          x: defaultOffsetX
        });
        stage.getContainer().addEventListener('mousedown', function(){
          document.body.style.cursor = 'all-scroll';
        });
        stage.getContainer().addEventListener('mouseup', function(){
          document.body.style.cursor = 'default';
        });

        
       

        // layers
        var layer           = new Kinetic.Layer();
        var layerTooltip    = new Kinetic.Layer();



        // objects of layer
        var rectArena = new Kinetic.Rect({
          x: padding[1],
          y: stage.getHeight() - 80 - padding[2],
          width: seatTotalWidth - padding[1] - padding[3],
          height: 80,
          fill: 'rgba(0, 0, 0, 0.1)',
          cornerRadius: 5
        });

        var txtArena = new Kinetic.Text({
          x: stage.getWidth()/2,
          y: stage.getHeight()/3*2 + 50,
          text: '表演區域',
          fontSize: 20,
          fill: 'rgba(0, 0, 0, 0.3)'
        });
        txtArena.setOffset({
          x: txtArena.getWidth()/2
        });

        layer.add(rectArena);
        layer.add(txtArena);

        // seats coordinate
        var seats = [
          {x:150, y:10, id: '10-1',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:170, y:10, id: '10-2',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:190, y:10, id: '10-3',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:210, y:10, id: '10-4',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:230, y:10, id: '10-5',   sold: true,  price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:250, y:10, id: '10-6',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:270, y:10, id: '10-7',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:290, y:10, id: '10-8',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:310, y:10, id: '10-9',   sold: true,  price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:330, y:10, id: '10-10',  sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},

          {x:10,  y:30, id: '9-1',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:30,  y:30, id: '9-2',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:50,  y:30, id: '9-3',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:70,  y:30, id: '9-4',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:90,  y:30, id: '9-5',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:150, y:30, id: '9-6',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:170, y:30, id: '9-7',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:190, y:30, id: '9-8',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:210, y:30, id: '9-9',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:230, y:30, id: '9-10',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:250, y:30, id: '9-11',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:270, y:30, id: '9-12',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:290, y:30, id: '9-13',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:310, y:30, id: '9-14',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:330, y:30, id: '9-15',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:390, y:30, id: '9-17',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:410, y:30, id: '9-18',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:430, y:30, id: '9-19',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:450, y:30, id: '9-20',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:470, y:30, id: '9-21',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},

          {x:10,  y:50, id: '8-1',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:30,  y:50, id: '8-2',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:50,  y:50, id: '8-3',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:70,  y:50, id: '8-4',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:90,  y:50, id: '8-5',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:150, y:50, id: '8-6',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:170, y:50, id: '8-7',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:190, y:50, id: '8-8',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:210, y:50, id: '8-9',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:230, y:50, id: '8-10',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:250, y:50, id: '8-11',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:270, y:50, id: '8-12',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:290, y:50, id: '8-13',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:310, y:50, id: '8-14',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:330, y:50, id: '8-15',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:390, y:50, id: '8-17',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:410, y:50, id: '8-18',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:430, y:50, id: '8-19',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:450, y:50, id: '8-20',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:470, y:50, id: '8-21',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},

          {x:10,   y:70, id: '7-1',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:30,   y:70, id: '7-2',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:50,   y:70, id: '7-3',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:70,   y:70, id: '7-4',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:90,   y:70, id: '7-5',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:150,  y:70, id: '7-6',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:170,  y:70, id: '7-7',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:190,  y:70, id: '7-8',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:210,  y:70, id: '7-9',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:230,  y:70, id: '7-10',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:250,  y:70, id: '7-11',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:270,  y:70, id: '7-12',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:290,  y:70, id: '7-13',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:310,  y:70, id: '7-14',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:330,  y:70, id: '7-15',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:390,  y:70, id: '7-17',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:410,  y:70, id: '7-18',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:430,  y:70, id: '7-19',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:450,  y:70, id: '7-20',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:470,  y:70, id: '7-21',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},

          {x:10,   y:90, id: '6-1',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:30,   y:90, id: '6-2',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:50,   y:90, id: '6-3',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:70,   y:90, id: '6-4',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:90,   y:90, id: '6-5',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:150,  y:90, id: '6-6',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:170,  y:90, id: '6-7',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:190,  y:90, id: '6-8',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:210,  y:90, id: '6-9',    sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:230,  y:90, id: '6-10',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:250,  y:90, id: '6-11',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:270,  y:90, id: '6-12',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:290,  y:90, id: '6-13',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:310,  y:90, id: '6-14',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:330,  y:90, id: '6-15',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:390,  y:90, id: '6-17',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:410,  y:90, id: '6-18',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:430,  y:90, id: '6-19',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:450,  y:90, id: '6-20',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:470,  y:90, id: '6-21',   sold: false, price: 100,    name: '劉德華-一般票', color: '11, 182, 114, 0.8'},

          {x:10,   y:110, id: '5-1',   sold: false,  price: 100,   name: '劉德華-一般票', color: '251, 85, 34, 0.8'},
          {x:30,   y:110, id: '5-2',   sold: false,  price: 100,   name: '劉德華-一般票', color: '251, 85, 34, 0.8'},
          {x:50,   y:110, id: '5-3',   sold: false,  price: 100,   name: '劉德華-一般票', color: '251, 85, 34, 0.8'},
          {x:70,   y:110, id: '5-4',   sold: false,  price: 100,   name: '劉德華-一般票', color: '251, 85, 34, 0.8'},
          {x:90,   y:110, id: '5-5',   sold: false,  price: 100,   name: '劉德華-一般票', color: '251, 85, 34, 0.8'},
          {x:150,  y:110, id: '5-6',   sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:170,  y:110, id: '5-7',   sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:190,  y:110, id: '5-8',   sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:210,  y:110, id: '5-9',   sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:230,  y:110, id: '5-10',  sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:250,  y:110, id: '5-11',  sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:270,  y:110, id: '5-12',  sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:290,  y:110, id: '5-13',  sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:310,  y:110, id: '5-14',  sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:330,  y:110, id: '5-15',  sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:390,  y:110, id: '5-17',  sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:410,  y:110, id: '5-18',  sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:430,  y:110, id: '5-19',  sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:450,  y:110, id: '5-20',  sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},
          {x:470,  y:110, id: '5-21',  sold: false,  price: 100,   name: '劉德華-一般票', color: '11, 182, 114, 0.8'},

          {x:10,   y:130, id: '4-1',   sold: false,  price: 100,   name: '劉德華-VIP'  , color: '251, 85, 34, 0.8' },
          {x:30,   y:130, id: '4-2',   sold: false,  price: 100,   name: '劉德華-VIP'  , color: '251, 85, 34, 0.8' },
          {x:50,   y:130, id: '4-3',   sold: false,  price: 100,   name: '劉德華-VIP'  , color: '251, 85, 34, 0.8' },
          {x:70,   y:130, id: '4-4',   sold: false,  price: 100,   name: '劉德華-VIP'  , color: '251, 85, 34, 0.8' },
          {x:90,   y:130, id: '4-5',   sold: false,  price: 100,   name: '劉德華-VIP'  , color: '251, 85, 34, 0.8' },
          {x:150,  y:130, id: '4-6',   sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:170,  y:130, id: '4-7',   sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:190,  y:130, id: '4-8',   sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:210,  y:130, id: '4-9',   sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:230,  y:130, id: '4-10',  sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:250,  y:130, id: '4-11',  sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:270,  y:130, id: '4-12',  sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:290,  y:130, id: '4-13',  sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:310,  y:130, id: '4-14',  sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:330,  y:130, id: '4-15',  sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:390,  y:130, id: '4-17',  sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:410,  y:130, id: '4-18',  sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:430,  y:130, id: '4-19',  sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:450,  y:130, id: '4-20',  sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:470,  y:130, id: '4-21',  sold: false,  price: 100,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },

          {x:10,   y:150, id: '3-1',   sold: false,  price: 700,   name: '劉德華-VIP'  , color: '251, 85, 34,  0.8' },
          {x:30,   y:150, id: '3-2',   sold: false,  price: 700,   name: '劉德華-VIP'  , color: '251, 85, 34,  0.8' },
          {x:50,   y:150, id: '3-3',   sold: true,   price: 700,   name: '劉德華-VIP'  , color: '251, 85, 34,  0.8' },
          {x:70,   y:150, id: '3-4',   sold: false,  price: 700,   name: '劉德華-VIP'  , color: '251, 85, 34,  0.8' },
          {x:90,   y:150, id: '3-5',   sold: false,  price: 700,   name: '劉德華-VIP'  , color: '251, 85, 34,  0.8' },
          {x:150,  y:150, id: '3-6',   sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:170,  y:150, id: '3-7',   sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:190,  y:150, id: '3-8',   sold: true,   price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:210,  y:150, id: '3-9',   sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:230,  y:150, id: '3-10',  sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:250,  y:150, id: '3-11',  sold: true,   price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:270,  y:150, id: '3-12',  sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:290,  y:150, id: '3-13',  sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:310,  y:150, id: '3-14',  sold: true,   price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:330,  y:150, id: '3-15',  sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:390,  y:150, id: '3-17',  sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:410,  y:150, id: '3-18',  sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:430,  y:150, id: '3-19',  sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:450,  y:150, id: '3-20',  sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:470,  y:150, id: '3-21',  sold: false,  price: 700,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },

          {x:10,   y:170, id: '2-1',   sold: false,  price: 800,   name: '劉德華-VIP'  , color: '251, 85, 34,  0.8' },
          {x:30,   y:170, id: '2-2',   sold: false,  price: 800,   name: '劉德華-VIP'  , color: '251, 85, 34,  0.8' },
          {x:50,   y:170, id: '2-3',   sold: false,  price: 800,   name: '劉德華-VIP'  , color: '251, 85, 34,  0.8' },
          {x:70,   y:170, id: '2-4',   sold: false,  price: 800,   name: '劉德華-VIP'  , color: '251, 85, 34,  0.8' },
          {x:90,   y:170, id: '2-5',   sold: false,  price: 800,   name: '劉德華-VIP'  , color: '251, 85, 34,  0.8' },
          {x:150,  y:170, id: '2-6',   sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:170,  y:170, id: '2-7',   sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:190,  y:170, id: '2-8',   sold: true,   price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:210,  y:170, id: '2-9',   sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:230,  y:170, id: '2-10',  sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:250,  y:170, id: '2-11',  sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:270,  y:170, id: '2-12',  sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:290,  y:170, id: '2-13',  sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:310,  y:170, id: '2-14',  sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:330,  y:170, id: '2-15',  sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:390,  y:170, id: '2-17',  sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:410,  y:170, id: '2-18',  sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:430,  y:170, id: '2-19',  sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:450,  y:170, id: '2-20',  sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:470,  y:170, id: '2-21',  sold: false,  price: 800,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },

          {x:10,   y:190, id: '1-1',   sold: false,  price: 900,   name: '劉德華-VIP'  , color: '251, 85, 34, 0.8' },
          {x:30,   y:190, id: '1-2',   sold: false,  price: 900,   name: '劉德華-VIP'  , color: '251, 85, 34, 0.8' },
          {x:50,   y:190, id: '1-3',   sold: true,   price: 900,   name: '劉德華-VIP'  , color: '251, 85, 34, 0.8' },
          {x:70,   y:190, id: '1-4',   sold: false,  price: 900,   name: '劉德華-VIP'  , color: '251, 85, 34, 0.8' },
          {x:90,   y:190, id: '1-5',   sold: false,  price: 900,   name: '劉德華-VIP'  , color: '251, 85, 34, 0.8' },
          {x:150,  y:190, id: '1-6',   sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:170,  y:190, id: '1-7',   sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:190,  y:190, id: '1-8',   sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:210,  y:190, id: '1-9',   sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:230,  y:190, id: '1-10',  sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:250,  y:190, id: '1-11',  sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:270,  y:190, id: '1-12',  sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:290,  y:190, id: '1-13',  sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:310,  y:190, id: '1-14',  sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:330,  y:190, id: '1-15',  sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:390,  y:190, id: '1-17',  sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:410,  y:190, id: '1-18',  sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:430,  y:190, id: '1-19',  sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:450,  y:190, id: '1-20',  sold: true,   price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' },
          {x:470,  y:190, id: '1-21',  sold: false,  price: 900,   name: '劉德華-VIP'  , color: '11, 182, 114, 0.8' }
        ];
        var tickets = [];
        for (var i=0; i<seats.length; i++) {
          var seat = new Kinetic.Circle({
            id:       seats[i].id,
            name:     seats[i].name,
            sold:     seats[i].sold,
            price:    seats[i].price,
            color:    seats[i].color, // rgba value
            x:        seats[i].x,
            y:        seats[i].y + 25, // offset y coordinate
            radius:   6,
            fill:     (seats[i].sold) ? 'rgba(100, 100, 100, 0.2)' : 'rgba(' + seats[i].color + ')',
            checked:  false      // only for frontend
          });

          seat.on('mouseover', function(evt){
            // add tooltip
            if (!this.attrs.sold) {
              if (!this.attrs.checked) {
                hoverSeatId = this.attrs.id;
                tooltip.setPosition(this.attrs.x * scale, (this.attrs.y - 5) * scale );
                tooltip.getText().setText(
                                          this.attrs.id + 
                                          '\n' + this.attrs.name + 
                                          '\nNTD ' + this.attrs.price);

                tooltip.show();
                layerTooltip.batchDraw();
                var rgba = this.attrs.color.split(',');
                for (var i=0; i<rgba.length; i++) {
                  rgba[i] = parseInt(rgba[i]);
                }
                // set brightness
                rgba[3] = 1;
                var masstone = rgba.indexOf(Math.max.apply(Math, rgba.slice(0,3)));
                rgba[masstone] = 255;
                this.attrs.fill = 'rgba(' + rgba.join(',') +')';
                layer.batchDraw();
                
              } else {
                hoverSeatId = '';
              }
            } // end if (!this.attrs.sold)            
          });

          seat.on('mouseout', function() {
            if (!this.attrs.sold && !this.attrs.checked) {
              hoverSeatId = '';
              tooltip.hide(); 
              layerTooltip.batchDraw();
              this.attrs.fill = 'rgba(' + this.attrs.color + ')';
              this.attrs.stroke = null;
              layer.batchDraw();
            }
          });

          seat.on('click', function() {
            if (!this.attrs.sold ){
              if (!this.attrs.checked && tickets.length < 10) {
                this.attrs.fill = 'rgba(' + this.attrs.color + ')';
                this.attrs.stroke = '#333'
                this.attrs.checked = true;
                // buy the ticket into cart
                tickets.push({
                  id: this.attrs.id,
                  name: this.attrs.name,
                  price: this.attrs.price
                });
              } else {
                this.attrs.fill = 'rgba(11, 182, 114, 0.8)';
                this.attrs.stroke = null;
                this.attrs.checked = false;
                // remove ticket from cart
                for (var i=0; i < tickets.length; i++){
                  if (tickets[i]['id'] === this.attrs.id)
                  {
                    tickets.splice(i, 1);
                  }  
                }
              }
              layer.draw();
            }
          });

          layer.add(seat); // done, add seat to layer
        }

       

        // object of layerTooltip
        var tooltip = new Kinetic.Label({
          opacity: 0.75,
          visible: false,
          listening: false
        });
        tooltip.add(new Kinetic.Tag({
          fill: 'black',
          pointerDirection: 'down',
          pointerWidth: 10,
          pointerHeight: 10,
          lineJoin: 'round',
          shadowOpacity: 0.5
        }));
        tooltip.add(new Kinetic.Text({
          text: '',
          fontFamily: 'Calibri',
          fontSize: 13,
          padding: 5,
          fill: 'white'
        }));
        layerTooltip.add(tooltip);

       
        
        // add layers to stage 
        stage.add(layer);
        stage.add(layerTooltip);
        // stage.add(layerDraggab);
        if(document.attachEvent){
          stage.getContainer().attachEvent('on' + mousewheel, function(e, delta){
            // fixed when cursor on seat and wheel
            if (hoverSeatId) {
              var seat = stage.find('#' + hoverSeatId)[0];
              if (!seat.attrs.sold && !seat.attrs.checked) {
                tooltip.hide(); 
                layerTooltip.draw();
                seat.attrs.fill = 'rgba(' + seat.attrs.color + ')';
                seat.attrs.stroke = null;
              }
            }
            
            Zoom(e);
          });
        } else if (document.addEventListener) {
          stage.getContainer().addEventListener(mousewheel, function(e, delta){
            // fixed when cursor on seat and wheel
            if (hoverSeatId) {
              var seat = stage.find('#' + hoverSeatId)[0];
              if (!seat.attrs.sold && !seat.attrs.checked) {
                tooltip.hide(); 
                layerTooltip.draw();
                seat.attrs.fill = 'rgba(' + seat.attrs.color + ')';
                seat.attrs.stroke = null;
              }
            }
            
            Zoom(e);
          });
        }
        
        
        //--------------------------------------------------


        // functions

        var SetSelectionArea = function (e) {
          if (dragging && !inhere) {
            inhere = true;
            var canvas = layer.getCanvas();
            var mousepos = stage.getPointerPosition();
            var x = mousepos.x;
            var y = mousepos.y;
            if (!selectionExists) {
              initX = x;
              initY = y;
              rectSelection = new Kinetic.Rect({
                x: initX,
                y: initY,
                height: 1,
                width: 1,
                fill: 'rgba(0, 0, 0, 0.2)'
              });
              layerBackground.add(rectSelection);
              layerBackground.batchDraw();
              selectionExists = true;
            } else {
              var height = 0;
              var width  = 0;
              var newX   = 0;
              var newY   = 0;

              if (x > initX)
                newX = initX;
              else
                newX = x;
              if (y > initY)
                newY = initY;
              else
                newY = y;

              var height = Math.abs(Math.abs(y) - Math.abs(initY));
              var width = Math.abs(Math.abs(x) - Math.abs(initX));
              rectSelection.setHeight(height);
              rectSelection.setWidth(width);
              rectSelection.setX(newX);
              rectSelection.setY(newY);
              layerBackground.batchDraw();
            }
          }
          inhere = false;
        }

        var Zoom = function(e) {
          var e = window.event || e 
          delta = e.detail ? e.detail*(-120) : e.wheelDelta;
          if (delta !== 0) {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
          }
          var nowScale;
          if (delta > 0) {
            nowScale = scale + Math.abs(delta / 640);
          } else {
            nowScale = scale - Math.abs(delta / 640);
          }

          if (nowScale > minScale && nowScale < maxScale) {
            var dom = document.getElementById('container');
            var canvaspos = GetPosition(dom);
            var pos = stage.getAbsolutePosition();
            var pageX = 0, pageY = 0;
            if (e.pageX || e.pageY) {
              pageX = e.pageX;
              pageY = e.pageY;
            } else if (e.clientX || e.clientY) {
              pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
              pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            var mousepos = stage.getPointerPosition();
            var smallCalc = (pageX - pos.x - canvaspos.x)/scale;
            var smallCalcY = (pageY - pos.y - canvaspos.y)/scale;
            var endCalc = (pageX - canvaspos.x) - nowScale*smallCalc;
            var endCalcY = (pageY - canvaspos.y) - nowScale*smallCalcY;
            scale = nowScale;
            stage.setPosition(endCalc, endCalcY);
            layer.setScale(nowScale);
            layer.batchDraw();
          }
        } 
        var GetPosition = function (el){
          for (var lx=0, ly=0;
           el != null;
           lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
          return {x: lx,y: ly};
        }

        // jquery and dom ready
        $(function(){
          var anim;
          $('#zoomResize').click(function(){
            if (!anim || !anim.isRunning()){
              anim = new Kinetic.Animation(function(frame) {
              var pos = stage.getAbsolutePosition();
                if (scale == 1 && pos.x == defaultOffsetX && pos.y == 0) {
                  frame.time = 0;
                  this.stop();
                } else {
          
                  var frameOfLayer = (scale - 1) * (frame.time / 500);
          
                  if ((scale > 1 && scale - frameOfLayer <= 1) || (scale < 1 && scale + frameOfLayer >= 1)) {
                    scale = 1;
                  } else {
                    scale = scale - frameOfLayer;
                  }
          
                  // adjust stage position
                  var frameOfStageX = (pos.x - defaultOffsetX) * (frame.time / 500);
                  var frameOfStageY = (pos.y - 0) * (frame.time / 500);
          
                  if ((pos.x > defaultOffsetX && pos.x - frameOfStageX <= defaultOffsetX) || (pos.x < defaultOffsetX && pos.x + frameOfStageX >= defaultOffsetX)) {
                    frameOfStageX = defaultOffsetX;
                  } else {
                    frameOfStageX = pos.x - frameOfStageX;
                  }
          
                  if ((pos.y > 0 && pos.y - frameOfStageY <= 0) || (pos.y < 0 && pos.y + frameOfStageY >= 0)) {
                    frameOfStageY = 0;
                  } else {
                    frameOfStageY = pos.y - frameOfStageY;
                  }
          
                  stage.setPosition(frameOfStageX, frameOfStageY);
                  layer.setScale(scale);
                }
              }, layer);
              
              anim.start();
            }
            
          });
          $('#zoomIn').click(function(e){

            if (!anim || !anim.isRunning()){
              var endScale = scale + 0.1875 >= maxScale ? maxScale : scale + 0.1875;
              var widthScale = (stage.getWidth() * 1.1875 - stage.getWidth()) / 2;
              var heightScale = (stage.getHeight() * 1.1875 - stage.getHeight()) / 2;
  
              anim = new Kinetic.Animation(function(frame) {
                if (scale == endScale) {
                  frame.time = 0;
                  this.stop();
                } else {
  
                  var frameOfLayer = 0.1875 * 0.1;
  
                  if (scale + frameOfLayer >= endScale) {
                    scale = endScale;
                  } else {
                    scale = scale + frameOfLayer;
                    scale = Math.round(scale * 1000)/1000;
                  }
  
                  // adjust stage position
                  var pos = stage.getAbsolutePosition();
                  var frameOfStageX = pos.x - widthScale * 0.1;
                  var frameOfStageY = pos.y - heightScale * 0.1;
  
                  layer.setScale(scale);
                  stage.setPosition(frameOfStageX, frameOfStageY);
                }
              }, layer);
              
              anim.start();
            } 
            
          });
          $('#zoomOut').click(function(e){
            if (!anim || !anim.isRunning()){
              var endScale = scale - 0.1875 <= minScale ? minScale : scale - 0.1875;
              var widthScale = (stage.getWidth() * 1.1875 - stage.getWidth()) / 2;
              var heightScale = (stage.getHeight() * 1.1875 - stage.getHeight()) / 2;
  
              anim = new Kinetic.Animation(function(frame) {
                if (scale == endScale) {
                  frame.time = 0;
                  this.stop();
                } else {
  
                  var frameOfLayer = 0.1875 * 0.1;
  
                  if (scale - frameOfLayer <= endScale) {
                    scale = endScale;
                  } else {
                    scale = scale - frameOfLayer;
                    scale = Math.round(scale * 1000)/1000;
                  }
  
                  // adjust stage position
                  var pos = stage.getAbsolutePosition();
                  var frameOfStageX = pos.x + widthScale * 0.1;
                  var frameOfStageY = pos.y + heightScale * 0.1;
  
                  layer.setScale(scale);
                  stage.setPosition(frameOfStageX, frameOfStageY);
                }
              }, layer);
              
              anim.start();
            }
            
          });
        })
       