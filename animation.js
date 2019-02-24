var start = function(){
    const AMOUNT = 2000;
    const COLOR = 0xffffff;
    const PIXI = window.PIXI;
    const canvas = document.getElementById("banner_canvas");
    //canvas.style.setProperty('filter', "blur(0px)");
    var app = new PIXI.Application(window.innerWidth,
                                   window.innerHeight,
                                   {view: canvas,
                                    antialias: true,
                                    transparent: true});

    const drops = new PIXI.Container();
    // Add container to app stage
    app.stage.addChild(drops)

    const randomColor = () =>
          [0xff3366, 0x2ec4b6, 0x20a4f3][
              Math.floor(Math.random() * 3)
          ]

    const genParticles = (texture) =>
          new Array(AMOUNT).fill().map(p => {
              var s = new PIXI.Sprite(texture);
              let size = Math.floor(Math.random()*6)+3;
              s.sz = size;
              s.width = s.sz;
              s.height = s.sz;
              s.x = Math.random()*window.innerWidth;
              s.y = Math.random()*window.innerHeight;
              s.offset = Math.random()*2*Math.PI;
              s.vx = 2/size;
              s.vy = 0;
              s.alpha = 20/(size*size);
              s.tint = randomColor();
              drops.addChild(s);
              return s;
          });

    // Create a base graphic for our sprites
    const p = new PIXI.Graphics()
    p.beginFill(COLOR)
    p.drawCircle(0, 0, 100)
    p.endFill()

    // Generate a base texture from the base graphic
    const baseTexture = app.renderer.generateTexture(p)
    let particles = genParticles(baseTexture)

    var time = 0;

    // Listen for animate update
    app.ticker.add(function(delta) {
        time += delta;
        if (
            app.renderer.height !== innerHeight ||
                app.renderer.width !== innerWidth
        ) {
            app.renderer.resize(innerWidth, innerHeight)
            drops.removeChildren()
            particles = genParticles(baseTexture)
        }
        var w = 1.2*document.getElementById("banner_title").offsetWidth;
        for(let p of particles){
            p.x += delta*p.vx;
            p.y += delta*p.vy;
            p.width = (Math.sin(time/100+p.offset)+1)*p.sz;
            p.height = (Math.sin(time/100+p.offset)+1)*p.sz;
            if(p.x >= window.innerWidth + 20){
                p.x = -20;
            }
        }
        app.renderer.render(drops);
    });

}

window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};


var f = function(){
    if(window.PIXI === undefined || !document.getElementById("banner_canvas")){
        window.setTimeout(() => f(), 100);
    } else if(!window.mobilecheck()) {
        start();
    }
}

f();
