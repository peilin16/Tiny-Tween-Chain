class Basics extends Phaser.Scene {
    constructor() {
        super('basicsScene')
    }

    preload() {
        // load assets
        this.load.path = './assets/'
        this.load.atlas('fruitandveg', 'img/fruitandveg.png', 'img/fruitandveg.json')
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml')
    }

    create() {
        // do camera stuff
        const centerX = this.cameras.main.centerX
        const centerY = this.cameras.main.centerY
        const w = this.cameras.main.width
        const h = this.cameras.main.height
        this.cameras.main.setBackgroundColor(0x11dc00)

        // add sprites
        let tomato = this.add.sprite(centerX, centerY, 'fruitandveg', 'tomato')
        let veryGoodPear = this.add.sprite(64,64,'fruitandveg','pear');
        // add text
        this.instructionText = this.add.bitmapText(centerX, centerY, 'gem_font', '', 24).setOrigin(0.5)

        // add tween
        let basicTween = this.tweens.add({
            targets: tomato,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 18 },
            angle: { from: 0, to: 360 },
            ease: 'Sine.easeInOut',
            duration: 2000,
            repeat: 1,
            yoyo: true,
            hold: 1000,
            onStart: () => {
                this.instructionText.text = 'Tomato tween, let\'s gooooooo'
            },
            onYoyo: () => {
                this.instructionText.text = 'Time to yoyo this tomato tween'
            },
            onRepeat: () => {
                this.instructionText.text = 'Let\s repeat the tween'
            },
            onComplete: () => {
                this.instructionText.text = 'Tomato tween complete!'
            }
        })

        // enable scene reload key
        this.reload = this.input.keyboard.addKey('R')
        this.pearTweenChain = this.tweens.chain({
            targets: veryGoodPear,
            ease: 'Bounce.easeOut',
            loop: 1,
            paused: false,
            tweens:[
                {
                    x:w-64,
                    duration:500

                },{
                    y:h-64,
                    duration:1000,
                    ease:'Sine.easeOut'
                },{
                    x:64,
                    duration:1500

                },{
                    y:64,
                    duration:1000

                }
            ]
        });
        this.input.on('pointerdown',()=>{
            veryGoodPear:setPosition(64,64),
            this.pearTweenChain.restart()
        })
        // update instruction text
        document.getElementById('info').innerHTML = '<strong>Basics.js</strong><br>R: Restart current scene'
    }

    update() {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart()
        }
    }
}