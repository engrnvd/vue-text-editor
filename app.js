Vue.component('textElement', {
    props: {
        data: {
            type: Object,
            default: () => ({
                text: '',
                fontSize: '12px',
                backgroundColor: '#ffffff',
                color: '#000000',
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
    <span :style="style" class="text-element" @mouseup="$emit('click', $event)">{{ data.text }}</span>
  `,
});

Vue.component('editor', {
    props: {
        data: Array
    },
    template: `
    <div class="editor" spellcheck="false" contenteditable="true" ref="editor" @mouseup="$emit('mouseup', $event)">
        <text-element v-for="(item, index) in data" :key="index" :data="item" @click="$emit('selected', item)"></text-element>
    </div>
  `,
    mounted() {
        this.$refs.editor.focus();
    }
});

Vue.component('actionButton', {
    props: {
        name: String,
        value: String,
    },
    methods: {
        perform() {
            let value = '';
            switch (this.name) {
                case 'inc-size':
                    value = parseInt(this.value);
                    this.$emit('input', (value + 2) + 'px');
                    break;
                case 'dec-size':
                    value = parseInt(this.value);
                    this.$emit('input', (value - 2) + 'px');
                    break;
                case 'change-bkg-color':
                case 'change-color':
                    value = this.value;
                    this.$refs.colorInput.value = value;
                    this.$refs.colorInput.click();
                    break;
                default:
                    console.log('Here we are');
            }
        }
    },
    template: `
    <div :class="'button ' + name" @click="perform">
        <div class="inputs" style="position:absolute; opacity: 0">
              <input type="color" ref="colorInput" @input="$emit('input', $event.target.value)">  
        </div>
        <slot></slot>
    </div>
  `
});

let app = new Vue({
    el: "#app",
    data: {
        textItems: [
            {
                text: 'Hi,\n',
                fontSize: '32px',
                backgroundColor: '#F8BBD0',
                color: '#ffffff',
            },
            {
                text: 'My lovely ',
                fontSize: '32px',
                backgroundColor: '#F8BBD0',
                color: '#ffffff',
            },
            {
                text: 'little ',
                fontSize: '54px',
                backgroundColor: '#ffffff',
                color: 'rgb(136, 14, 79)',
            },
            {
                text: 'Pony',
                fontSize: '32px',
                color: 'rgb(186, 104, 200)',
                backgroundColor: 'rgb(248, 187, 0)'
            },
        ],
        selectedItem: null,
        selectedText: '',
    },
    methods: {
        onTextSelected(item) {
            this.selectedItem = item;
            this.selectedText = this.getSelectedText();
        },
        getSelectedText() {
            if (window.getSelection) {
                return window.getSelection().toString();
            } else if (document.selection) {
                return document.selection.createRange().text;
            }
            return '';
        }
    },
    mounted() {
        this.selectedItem = this.textItems[0];
    }
});
