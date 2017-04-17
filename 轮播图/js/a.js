class slide{
    constructor(el,cycle=3000){
        this.list = el.querySelectorAll('li');
        this.cycle = cycle;
        this.list = Array.from(this.list);
        this.current = 0;
        this.select = 'slider-list__item--selected';
        this.btn_select = 'slide-btn_select';
        this.btn_group = el.querySelector('#btn-group');

        this.btns = el.querySelectorAll('.slide-btn');
        el.addEventListener('mouseover',(event)=>{
            let index=Array.from(this.btns).indexOf(event.target);
            if(index>=0){
                el.querySelector('.'+this.btn_select).className = el.querySelector('.'+this.btn_select).className.replace(this.btn_select,'');
                this.btns[index].className+=" "+this.btn_select;
                this.stop();
                this.slideTo(index);
            }
        })
        this.btn_group.addEventListener('mouseout',(event)=>{
            this.start();
            console.log(111);
        });
    }

    changeClass(src,dst){
        src.className=src.className.replace(this.select,'');
        dst.className += dst.className.slice(-1) === ' '?this.select:" "+this.select;
    }

    slideNext(){
        if(this.current == this.list.length-1){
            this.slideTo(0);
            return;
        }
        this.slideTo(this.current+1);
    }

    slidePevious(){
        if(this.current == 0){
            this.slideTo(this.list.length);
            return;
        }
        this.slideTo(this.current-1);
    }

    slideTo(index){
        this.changeClass(this.list[this.current],this.list[index]);
        document.querySelector('.'+this.btn_select).className = document.querySelector('.'+this.btn_select).className.replace(this.btn_select,'');
        this.btns[index].className +=" "+this.btn_select;
        this.current = index;
    }

    getCurrentPage(){
        return this.list[this.current];
    }

    stop(){
        clearInterval(this.timer);
    }

    start(){
       this.stop();
       this.timer = setInterval(()=>{this.slideNext()},this.cycle);
    }
}

window.onload=function () {
    var li = new slide(document.getElementById('container'),1000);

    li.start();
}