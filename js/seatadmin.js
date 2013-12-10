var mousewheel=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
        // variable and global config
        var padding = [10, 10, 10, 10]; // top, right, bottom, left
        var stageWidth = 480;           // canvas 寬
        var stageHeight = 320;          // canvas 高
        var seatWidth = 20;             // 一個位置寬
        var seatHeight = 20;            // 一個位置高
        var seatRadius = 6;             // 預設位置為圓形，半徑設定。
        var seatRow = 10;               // 最外層有多少列
        var seatColumn = 24;            // 最外層多少行
        var seatTotalWidth = seatWidth * seatColumn;
        var seatTotalHeight = seatHeight * seatRow;
        var seatsConfig = [];           // 用來暫存設定哪些座位。
        var seatsUnconfigColor = '0,0,0,0.2'; // 座位的設定顏色方式統一只取 rgba(value) value 值。
        var seatsUnconfigHighlight = '0,100,0,0.8'; // 座位的設定顏色方式統一只取 rgba(value) value 值。

        
        var defaultScale = (seatTotalWidth >= seatTotalHeight) ? (stageWidth/seatTotalWidth) * 0.9 : (stageHeight/seatTotalHeight) * 0.9 ;
        var scale = defaultScale;
        var defaultOffsetX = (stageWidth - seatTotalWidth * defaultScale)/2; // for stage align center
        var minScale = 0.25;
        var maxScale = 2.5;
        var hoverSeatId = '';
    
        var isSelecting = false;
        var isSelectBoxExists = false;
        var isSelectBoxDrawing = false;
        var rectSelectBox = null;
        var rectSelectInitX = 0;
        var rectSelectnitY = 0;

        var rectSelectFill = 'rgba(0,0,0,0.2)';     // 選取方塊顏色
        var rectSelectStroke = 'transparent';       // 選取方塊邊框顏色
        var highlightFill = 'rgba(0,0,0,0.3)';      // 被選取座位高亮顏色
        var highlightStroke = 'rgba(99,202,252,1)'; // 被選取座位高亮邊框顏色
        var highlightStrokeWidth = 2;               // 被選取座位高亮邊框寬度

        // stage
        var stage = new Kinetic.Stage({
          container: 'container',
          width: stageWidth,
          height: stageHeight,
          draggable: false
        });
        
        // layers
        var layer = new Kinetic.Layer({
          scale: defaultScale,
          x: defaultOffsetX
        });
        var layerSelection = new Kinetic.Layer();
        var layerTooltip   = new Kinetic.Layer();

        // objects of layerSelection
        var rectBackground = new Kinetic.Rect({
          x: 0,
          y: 0,
          width: stage.getWidth(),
          height: stage.getHeight(),
          fill: 'transparent',
          draggable: false,
          name: 'background'
        });

        rectBackground.on('mousedown', function(e) {
          if (!e.shiftKey) {
            isSelecting = true;
          } 
        });
        layerSelection.add(rectBackground);

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
        // fixed two layer the main layer
        layer.on('mousedown', function(e) {
          if (!e.shiftKey) {
              isSelecting = true;
          } 
        });

        // layer.on('mousedown' ,function(e){
        //   if (e.shiftKey){
        //     layer.startDrag();
        //   }
        // });
        // layer.on('mouseup', function(e) {
        //   layer.stopDrag();
        // })

        // seats coordinate 初始化座位表
        var seats = [
          {x:150, y:10, id: '10-1'}, 
          {x:170, y:10, id: '10-2'}, 
          {x:190, y:10, id: '10-3'}, 
          {x:210, y:10, id: '10-4'}, 
          {x:230, y:10, id: '10-5'}, 
          {x:250, y:10, id: '10-6'}, 
          {x:270, y:10, id: '10-7'}, 
          {x:290, y:10, id: '10-8'}, 
          {x:310, y:10, id: '10-9'}, 
          {x:330, y:10, id: '10-10'}, 

          {x:10,  y:30, id:'9-1'}, 
          {x:30,  y:30, id:'9-2'}, 
          {x:50,  y:30, id:'9-3'}, 
          {x:70,  y:30, id:'9-4'}, 
          {x:90,  y:30, id:'9-5'}, 
          {x:150, y:30, id:'9-6'}, 
          {x:170, y:30, id:'9-7'}, 
          {x:190, y:30, id:'9-8'}, 
          {x:210, y:30, id:'9-9'}, 
          {x:230, y:30, id:'9-10'}, 
          {x:250, y:30, id:'9-11'}, 
          {x:270, y:30, id:'9-12'}, 
          {x:290, y:30, id:'9-13'}, 
          {x:310, y:30, id:'9-14'}, 
          {x:330, y:30, id:'9-15'}, 
          {x:390, y:30, id:'9-17'}, 
          {x:410, y:30, id:'9-18'}, 
          {x:430, y:30, id:'9-19'}, 
          {x:450, y:30, id:'9-20'}, 
          {x:470, y:30, id:'9-21'}, 

          {x:10,  y:50, id: '8-1'}, 
          {x:30,  y:50, id: '8-2'}, 
          {x:50,  y:50, id: '8-3'}, 
          {x:70,  y:50, id: '8-4'}, 
          {x:90,  y:50, id: '8-5'}, 
          {x:150, y:50, id: '8-6'}, 
          {x:170, y:50, id: '8-7'}, 
          {x:190, y:50, id: '8-8'}, 
          {x:210, y:50, id: '8-9'}, 
          {x:230, y:50, id: '8-10'}, 
          {x:250, y:50, id: '8-11'}, 
          {x:270, y:50, id: '8-12'}, 
          {x:290, y:50, id: '8-13'}, 
          {x:310, y:50, id: '8-14'}, 
          {x:330, y:50, id: '8-15'}, 
          {x:390, y:50, id: '8-17'}, 
          {x:410, y:50, id: '8-18'}, 
          {x:430, y:50, id: '8-19'}, 
          {x:450, y:50, id: '8-20'}, 
          {x:470, y:50, id: '8-21'}, 

          {x:10,   y:70, id: '7-1'},
          {x:30,   y:70, id: '7-2'},
          {x:50,   y:70, id: '7-3'},
          {x:70,   y:70, id: '7-4'},
          {x:90,   y:70, id: '7-5'},
          {x:150,  y:70, id: '7-6'},
          {x:170,  y:70, id: '7-7'},
          {x:190,  y:70, id: '7-8'},
          {x:210,  y:70, id: '7-9'},
          {x:230,  y:70, id: '7-10'},
          {x:250,  y:70, id: '7-11'},
          {x:270,  y:70, id: '7-12'},
          {x:290,  y:70, id: '7-13'},
          {x:310,  y:70, id: '7-14'},
          {x:330,  y:70, id: '7-15'},
          {x:390,  y:70, id: '7-17'},
          {x:410,  y:70, id: '7-18'},
          {x:430,  y:70, id: '7-19'},
          {x:450,  y:70, id: '7-20'},
          {x:470,  y:70, id: '7-21'},

          {x:10,   y:90, id:'6-1'},
          {x:30,   y:90, id:'6-2'},
          {x:50,   y:90, id:'6-3'},
          {x:70,   y:90, id:'6-4'},
          {x:90,   y:90, id:'6-5'},
          {x:150,  y:90, id:'6-6'},
          {x:170,  y:90, id:'6-7'},
          {x:190,  y:90, id:'6-8'},
          {x:210,  y:90, id:'6-9'},
          {x:230,  y:90, id:'6-10'},
          {x:250,  y:90, id:'6-11'},
          {x:270,  y:90, id:'6-12'},
          {x:290,  y:90, id:'6-13'},
          {x:310,  y:90, id:'6-14'},
          {x:330,  y:90, id:'6-15'},
          {x:390,  y:90, id:'6-17'},
          {x:410,  y:90, id:'6-18'},
          {x:430,  y:90, id:'6-19'},
          {x:450,  y:90, id:'6-20'},
          {x:470,  y:90, id:'6-21'},

          {x:10,   y:110, id:'5-1'},
          {x:30,   y:110, id:'5-2'},
          {x:50,   y:110, id:'5-3'},
          {x:70,   y:110, id:'5-4'},
          {x:90,   y:110, id:'5-5'},
          {x:150,  y:110, id:'5-6'},
          {x:170,  y:110, id:'5-7'},
          {x:190,  y:110, id:'5-8'},
          {x:210,  y:110, id:'5-9'},
          {x:230,  y:110, id:'5-10'},
          {x:250,  y:110, id:'5-11'},
          {x:270,  y:110, id:'5-12'},
          {x:290,  y:110, id:'5-13'},
          {x:310,  y:110, id:'5-14'},
          {x:330,  y:110, id:'5-15'},
          {x:390,  y:110, id:'5-17'},
          {x:410,  y:110, id:'5-18'},
          {x:430,  y:110, id:'5-19'},
          {x:450,  y:110, id:'5-20'},
          {x:470,  y:110, id:'5-21'},

          {x:10,   y:130, id: '4-1'},
          {x:30,   y:130, id: '4-2'},
          {x:50,   y:130, id: '4-3'},
          {x:70,   y:130, id: '4-4'},
          {x:90,   y:130, id: '4-5'},
          {x:150,  y:130, id: '4-6'},
          {x:170,  y:130, id: '4-7'},
          {x:190,  y:130, id: '4-8'},
          {x:210,  y:130, id: '4-9'},
          {x:230,  y:130, id: '4-10'},
          {x:250,  y:130, id: '4-11'},
          {x:270,  y:130, id: '4-12'},
          {x:290,  y:130, id: '4-13'},
          {x:310,  y:130, id: '4-14'},
          {x:330,  y:130, id: '4-15'},
          {x:390,  y:130, id: '4-17'},
          {x:410,  y:130, id: '4-18'},
          {x:430,  y:130, id: '4-19'},
          {x:450,  y:130, id: '4-20'},
          {x:470,  y:130, id: '4-21'},

          {x:10,   y:150, id: '3-1'},
          {x:30,   y:150, id: '3-2'},
          {x:50,   y:150, id: '3-3'},
          {x:70,   y:150, id: '3-4'},
          {x:90,   y:150, id: '3-5'},
          {x:150,  y:150, id: '3-6'},
          {x:170,  y:150, id: '3-7'},
          {x:190,  y:150, id: '3-8'},
          {x:210,  y:150, id: '3-9'},
          {x:230,  y:150, id: '3-10'},
          {x:250,  y:150, id: '3-11'},
          {x:270,  y:150, id: '3-12'},
          {x:290,  y:150, id: '3-13'},
          {x:310,  y:150, id: '3-14'},
          {x:330,  y:150, id: '3-15'},
          {x:390,  y:150, id: '3-17'},
          {x:410,  y:150, id: '3-18'},
          {x:430,  y:150, id: '3-19'},
          {x:450,  y:150, id: '3-20'},
          {x:470,  y:150, id: '3-21'},

          {x:10,   y:170, id: '2-1'},
          {x:30,   y:170, id: '2-2'},
          {x:50,   y:170, id: '2-3'},
          {x:70,   y:170, id: '2-4'},
          {x:90,   y:170, id: '2-5'},
          {x:150,  y:170, id: '2-6'},
          {x:170,  y:170, id: '2-7'},
          {x:190,  y:170, id: '2-8'},
          {x:210,  y:170, id: '2-9'},
          {x:230,  y:170, id: '2-10'},
          {x:250,  y:170, id: '2-11'},
          {x:270,  y:170, id: '2-12'},
          {x:290,  y:170, id: '2-13'},
          {x:310,  y:170, id: '2-14'},
          {x:330,  y:170, id: '2-15'},
          {x:390,  y:170, id: '2-17'},
          {x:410,  y:170, id: '2-18'},
          {x:430,  y:170, id: '2-19'},
          {x:450,  y:170, id: '2-20'},
          {x:470,  y:170, id: '2-21'},

          {x:10,   y:190, id: '1-1'},
          {x:30,   y:190, id: '1-2'},
          {x:50,   y:190, id: '1-3'},
          {x:70,   y:190, id: '1-4'},
          {x:90,   y:190, id: '1-5'},
          {x:150,  y:190, id: '1-6'},
          {x:170,  y:190, id: '1-7'},
          {x:190,  y:190, id: '1-8'},
          {x:210,  y:190, id: '1-9'},
          {x:230,  y:190, id: '1-10'},
          {x:250,  y:190, id: '1-11'},
          {x:270,  y:190, id: '1-12'},
          {x:290,  y:190, id: '1-13'},
          {x:310,  y:190, id: '1-14'},
          {x:330,  y:190, id: '1-15'},
          {x:390,  y:190, id: '1-17'},
          {x:410,  y:190, id: '1-18'},
          {x:430,  y:190, id: '1-19'},
          {x:450,  y:190, id: '1-20'},
          {x:470,  y:190, id: '1-21'}
        ];
        var tickets = [
          {price: 100, name: '一般票', sold: false, color: '0, 200, 100, 0.8'},
          {price: 999, name: '貴賓票', sold: false, color: '0, 0, 200, 0.8'}
        ];
        for (var i=0; i<seats.length; i++) {
          var seat = new Kinetic.Circle({
            id:       seats[i].id ? seats[i].id : i.toString(),
            name:     seats[i].name ? seats[i].id : i.toString(),
            sold:     seats[i].sold ? seats[i].sold : false,
            price:    seats[i].price ? seats[i].price : 0,
            fill:     (!seats[i].color) ? 'rgba(' + seatsUnconfigColor + ')' : 'rgba(' + seats[i].color  + ')',
            color:    null,
            x:        seats[i].x,
            y:        seats[i].y + 25, // offset y coordinate
            radius:   seatRadius,
            checked:  false      // only for frontend
          });
          seat.on('mouseover', function(e){
            // add tooltip
            hoverSeatId = this.attrs.id;
            tooltip.setPosition(this.getAbsolutePosition().x, (this.getAbsolutePosition().y - 6) );
            tooltip.getText().setText(
                                      this.attrs.id + 
                                      '\n' + this.attrs.name + 
                                      '\nNTD ' + this.attrs.price);

            tooltip.show();
            layerTooltip.batchDraw();

            if (this.attrs.color) {
              var rgba = this.attrs.color.split(',');
              for (var i=0; i<rgba.length; i++) {
                rgba[i] = parseInt(rgba[i]);
              }
              // set brightness
              rgba[3] = 1;
              var masstone = rgba.indexOf(Math.max.apply(Math, rgba.slice(0,3)));
              rgba[masstone] = 255;
              this.attrs.fill = 'rgba(' + rgba.join(',') +')';
            } else {
              this.attrs.fill = 'rgba(' + seatsUnconfigHighlight +')';
            }      
            layer.batchDraw();          
          });

          seat.on('mouseout', function(e) {
            hoverSeatId = '';
            tooltip.hide(); 
            layerTooltip.batchDraw();
            if (this.attrs.color) {
              this.attrs.fill = 'rgba(' + this.attrs.color + ')';
              this.attrs.stroke = null;
            } else {
              this.attrs.fill = 'rgba(' + seatsUnconfigColor +')';
            }
            layer.batchDraw();
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
        stage.add(layerSelection);
        stage.add(layer);
        stage.add(layerTooltip);
        // stage.add(layerDraggab);

        // **** stage events 
        stage.getContainer().addEventListener('mousedown', function(e){
          // document.body.style.cursor = 'all-scroll';
          if(!e.shiftKey) {
            if (seatsConfig.length > 0) {
              var name = '';
  
              if (e.shape != undefined)
                name = e.shape.attrs.name;
  
              if (e.targetNode != undefined)
                name = e.targetNode.attrs.name;
  
              var seats = layer.get('.highlight');
              while (seats.length > 0) {
                seats[0].remove();
                seats = layer.get('.highlight');
              }
              seatsConfig.length = 0;
            }
          }
          
        });
        stage.getContainer().addEventListener('mouseup', function(e){

          if (isSelecting) {
            isSelecting = false;

            // Get overlapped 取得重疊區塊
            GetOverlapped(e);

            // Clear select box
            if (rectSelectBox != null) {
              rectSelectBox.remove();
            }
            rectSelectBox = null;
            isSelectBoxExists = false;
            
          }
          // Popup a modal for set ticket with seat
          if (seatsConfig.length > 0) {
            $('.zoom-divider, .zoom-setting').removeClass('zoom-hidden');
          } else {
            $('#zoomSetting').addClass('zoom-hidden');
            $('#zoomSetting').prev('.zoom-divider').addClass('zoom-hidden');
          }
          layerSelection.draw();
          layer.batchDraw();
        });
        stage.getContainer().addEventListener('mousemove', function(e) {
          if(isSelecting){
            SetSelectionArea(e);
          }
        });

        
        if(document.attachEvent){
          stage.getContainer().attachEvent('on' + mousewheel, function(e, delta){
            // fixed when cursor on seat and wheel
            if (hoverSeatId) {
              var seat = stage.find('#' + hoverSeatId)[0];
              tooltip.hide(); 
              layerTooltip.draw();
              if (seat.attrs.color) {
                seat.attrs.fill = 'rgba(' + seat.attrs.color + ')';
                seat.attrs.stroke = null;
              } else {
                seat.attrs.fill = 'rgba(' + seatsUnconfigColor +')';
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
              tooltip.hide(); 
              layerTooltip.draw();
              if (seat.attrs.color) {
                seat.attrs.fill = 'rgba(' + seat.attrs.color + ')';
                seat.attrs.stroke = null;
              } else {
                seat.attrs.fill = 'rgba(' + seatsUnconfigColor +')';
                seat.attrs.stroke = null;
              }
            }
            Zoom(e);
          });
        }
        
        
        //--------------------------------------------------


        // functions

        var SetSelectionArea = function (e) {
          if (isSelecting && !isSelectBoxDrawing) {
            isSelectBoxDrawing = true;
            var mousePos = stage.getPointerPosition();
            if (mousePos) {
              
              var x = (mousePos.x) ? mousePos.x - stage.getAbsolutePosition().x : stage.getX() + stage.getWidth();
              var y = (mousePos.y) ? mousePos.y - stage.getAbsolutePosition().y : stage.getY() + stage.getHeight();
              if (!isSelectBoxExists) {
                rectSelectInitX = x;
                rectSelectInitY = y;
                rectSelectBox = new Kinetic.Rect({
                  x: rectSelectInitX,
                  y: rectSelectInitY,
                  height: 1,
                  width: 1,
                  fill: rectSelectFill,
                  stroke: rectSelectStroke
                });
                layerSelection.add(rectSelectBox);
                layerSelection.draw();
                isSelectBoxExists = true;
              } else {
                var height = 0;
                var width  = 0;
                var newX   = 0;
                var newY   = 0;
  
                if (x > rectSelectInitX)
                  newX = rectSelectInitX;
                else
                  newX = x;
                if (y > rectSelectInitY)
                  newY = rectSelectInitY;
                else
                  newY = y;
  
                height = Math.abs(Math.abs(y) - Math.abs(rectSelectInitY));
                width = Math.abs(Math.abs(x) - Math.abs(rectSelectInitX));
                rectSelectBox.setHeight(height);
                rectSelectBox.setWidth(width);
                rectSelectBox.setX(newX);
                rectSelectBox.setY(newY);
                layerSelection.batchDraw();
              } 
            
            
            }
          }
          isSelectBoxDrawing = false;
        }
        var GetOverlapped = function(e) {
          if (rectSelectBox == null){
            GetOverlappedOnRectNull(e);
            return;
          }
            
          seatsConfig.length = 0;
          rectSelectInitX = 0;
          rectSelectInitY = 0;

          var seats = layer.find('Circle');
          for (var i = 0; i<seats.length; i++){
            var seat = seats[i];
            var pos = rectSelectBox.getAbsolutePosition();

            var startX = parseInt(pos.x - stage.getAbsolutePosition().x);
            var endX = parseInt(pos.x - stage.getAbsolutePosition().x) + parseInt(rectSelectBox.getWidth());
            var startY = parseInt(pos.y - stage.getAbsolutePosition().y);
            var endY = parseInt(pos.y - stage.getAbsolutePosition().y) + parseInt(rectSelectBox.getHeight());
            // 取得物件的四點

            var seatStartX = parseInt(seat.getAbsolutePosition().x - seat.getRadius());
            var seatEndX = parseInt(seat.getAbsolutePosition().x) + parseInt(seat.getRadius());
            var seatStartY = parseInt(seat.getAbsolutePosition().y);
            var seatEndY = parseInt(seat.getAbsolutePosition().y) + parseInt(seat.getRadius());
            // Compare 比對
            if ((startX <= seatStartX && endX >= seatEndX) && (startY <= seatStartY && endY >= seatEndY)) {
              if (seatsConfig.indexOf(seat.getId()) < 0) {
                seatsConfig.push(seat.getId());
                var tmpX = parseInt(seat.getX());
                var tmpY = parseInt(seat.getY());
                var highlight = new Kinetic.Circle({
                  x: tmpX,
                  y: tmpY,
                  radius: seatRadius,
                  fill: highlightFill,
                  stroke: highlightStroke,
                  strokeWidth: highlightStrokeWidth,
                  name: 'highlight'
                });
                layer.add(highlight);
              }
            }
          }
        }
        var GetOverlappedOnRectNull = function(e) {
          seatsConfig.length = 0;
          // if (hoverSeatId) {
            var seat = e.targetNode;
            if (seatsConfig.indexOf(seat.getId()) < 0 && seat.getClassName() == 'Circle' && seat.getName() != 'highlight') {
              seatsConfig.push(seat.getId());
              var tmpX = parseInt(seat.getX());
              var tmpY = parseInt(seat.getY());
              var highlight = new Kinetic.Circle({
                x: tmpX,
                y: tmpY,
                radius: seatRadius,
                fill: highlightFill,
                stroke: highlightStroke,
                strokeWidth: highlightStrokeWidth,
                name: 'highlight'
              });
              layer.add(highlight);
            }
          // }
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
            var canvasPos = GetPosition(dom);
            var pos = layer.getAbsolutePosition();
            var layerPos = layer.getAbsolutePosition();
            var pageX = 0, pageY = 0;
            if (e.pageX || e.pageY) {
              pageX = e.pageX;
              pageY = e.pageY;
            } else if (e.clientX || e.clientY) {
              pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
              pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            var mousePos = stage.getPointerPosition();
            var smallCalc = (pageX - pos.x - canvasPos.x)/scale;
            var smallCalcY = (pageY - pos.y - canvasPos.y)/scale;
            var endCalc = (pageX - canvasPos.x) - nowScale*smallCalc;
            var endCalcY = (pageY - canvasPos.y) - nowScale*smallCalcY;
            scale = nowScale;
            layer.setAbsolutePosition(endCalc, endCalcY);
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
                var pos = layer.getAbsolutePosition();
                if (scale == defaultScale && pos.x == defaultOffsetX && pos.y == 0) {
                  frame.time = 0;
                  this.stop();
                } else {
            
                  var frameOfLayer = (scale - defaultScale) * (frame.time / 500);
          
                  if ((scale > defaultScale && scale - frameOfLayer <= defaultScale) || (scale < defaultScale && scale + frameOfLayer >= defaultScale)) {
                    scale = defaultScale;
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
            
                  layer.setAbsolutePosition(frameOfStageX, frameOfStageY);
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
                  var pos = layer.getAbsolutePosition();
                  var frameOfStageX = pos.x - widthScale * 0.1;
                  var frameOfStageY = pos.y - heightScale * 0.1;
  
                  layer.setScale(scale);
                  layer.setAbsolutePosition(frameOfStageX, frameOfStageY);
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
                  var pos = layer.getAbsolutePosition();
                  var frameOfStageX = pos.x + widthScale * 0.1;
                  var frameOfStageY = pos.y + heightScale * 0.1;
  
                  layer.setScale(scale);
                  layer.setAbsolutePosition(frameOfStageX, frameOfStageY);
                }
              }, layer);
              
              anim.start();
            }
          });
          $('#zoomSetting').click(function(e) {
            $('.ui.modal').modal({
              debug: false,
              onApprove: function(){
                console.log(seatsConfig);
                var index = parseInt($('.ui.dropdown').dropdown('get value')) - 1;
                if (index) {
                  for (var i = 0; i<seatsConfig.length; i++) {
                    var seat = layer.find('#' + seatsConfig[i])[0];
                    seat.setAttr('price', tickets[index].price);
                    seat.setAttr('color', tickets[index].color);
                    seat.setAttr('name', tickets[index].name);
                    seat.setAttr('sold', tickets[index].sold);
                  }
                  if (seatsConfig.length > 0) {
                    var seats = layer.get('.highlight');
                    while (seats.length > 0) {
                      seats[0].remove();
                      seats = layer.get('.highlight');
                    }
                    seatsConfig.length = 0;
                  }
                  console.log('done');
                  layer.batchDraw();
                }
              }
            }).modal('show');
          })

          var isDraggable = false;
          $(document).on('mousedown', function(e){
            if (e.shiftKey) {
              layer.startDrag();
            }
          });

          $(document).on('mouseup', function(e){
            layer.stopDrag();
          });

          $(document).on('mousemove', function(e){
            if (!e.shiftKey) {
              document.body.style.cursor = 'default';
              layer.stopDrag();
            }
          });

          $(document).on('keydown', function(e){
            if (e.shiftKey) {
              document.body.style.cursor = 'all-scroll';
            }
          });

          $(document).on('keyup', function(e) {
            document.body.style.cursor = 'default';
          });


          $('.ui .dropdown').dropdown({
            debug: false,
            onChange: function(value, text){
              // console.log(text);
              // console.log(value);
            }
          });
        });

        
      