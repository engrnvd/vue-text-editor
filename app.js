Vue.component('textElement', {
    props: {
        data: {
            type: Object,
            default: () => ({
                text: '',
                fontSize: '12px',
                backgroundColor: '#fff',
                color: '#000',
            }),
        }
    },
    computed: {
        style() {
            let style = {...this.data};
            delete style.text;
            return style;
        }
    },
    template: `
    <span :style="style" class="text-element">{{ data.text }}</span>
  `,
});

let app = new Vue({
    el: "#app",
    data: {
        text: [
            {
                text: 'Hi,\n',
                fontSize: '32px',
                backgroundColor: 'rgb(248, 187, 208)',
                color: '#fff',
            },
            {
                text: 'My lovely ',
                fontSize: '32px',
                backgroundColor: 'rgb(248, 187, 208)',
                color: '#fff',
            },
            {
                text: 'little ',
                fontSize: '54px',
                backgroundColor: 'white',
                color: 'rgb(136, 14, 79)',
            },
            {
                text: 'Pony',
                fontSize: '32px',
                color: 'rgb(186, 104, 200)',
                backgroundColor: 'rgb(248, 187, 0)'
            },
        ],
    },
    methods: {
        remove(item) {
            this.items = _.reject(this.items, i => item.id === i.id);
        },
    }
});
