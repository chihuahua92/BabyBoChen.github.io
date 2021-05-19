const app = Vue.createApp({
    mounted() {
        this.clearYear();
        this.clearMonth();
        this.spawnYear();
        this.spawnMonth();
    },
    updated() {

    },
    data() {
        
        return {
            year: -1,
            month: -1,
            date: -1,
            selected_date: null,
            mready: false,
            toDview: false
        }
    },
    methods: {
        clearYear(){
            this.$refs.year_select.innerHTML = "";
            this.$refs.year_select.selectedIndex = -1;
        },
        spawnYear() {
            console.log("spawning year options");
            for (let i = new Date().getFullYear(); i >= 2000; i--) {
                /** @type {HTMLOptionElement} */
                let y = document.createElement("option");
                y.text = i;
                y.value = i;
                this.$refs.year_select.append(y);
            }
            this.$refs.year_select.selectedIndex = -1;
        },
        clearMonth(){
            this.$refs.month_select.innerHTML = "";
            this.$refs.month_select.selectedIndex = -1;
        },
        spawnMonth() {
            console.log("spawning month options");
            for (let i = 11; i >= 0; i--) {
                /** @type {HTMLOptionElement} */
                let m = document.createElement("option");
                m.text = i + 1;
                m.value = i + 1;
                this.$refs.month_select.append(m);
            }
            this.$refs.month_select.selectedIndex = -1;
        },
        clearDate(){
            this.$refs.date_select.innerHTML = "";
            this.$refs.date_select.selectedIndex = -1;
        },        
        /**@param {number} lastDay */
        spawnDate(lastDay) {
            this.clearDate();
            console.log("spawning date options");
            for (let i = lastDay; i > 0; i--) {
                /** @type {HTMLOptionElement} */
                let d = document.createElement("option");
                d.text = i;
                d.value = i;
                this.$refs.date_select.append(d);
            }
            this.date = 1;
            this.$refs.date_select.selectedIndex = -1;
        },
        yearSelected(e) {
            this.year = parseInt(this.$refs.year_select.value);
            console.log("year_select");
            let date = new Date(this.year, this.month, 0);
            this.spawnDate(date.getDate());
            this.selected_date = new Date(this.year, this.month + 1, 1);
            if (this.year != -1 && this.month != -1 && this.mready != true) {
                this.$refs.date_select.disabled = false;
                this.mready = true;
            } else if (this.mready) {
                this.$refs.mview.updateDate(this.year, this.month, this.date);
            }
        },
        monthSelected(e) {
            this.month = parseInt(this.$refs.month_select.value);
            console.log("month_select");
            let date = new Date(this.year, this.month, 0);
            this.spawnDate(date.getDate());
            this.selected_date = new Date(this.year, this.month + 1, 1);
            if (this.year != -1 && this.month != -1 && this.mready != true) {
                this.$refs.date_select.disabled = false;
                this.mready = true;
            } else if (this.mready) {
                this.$refs.mview.updateDate(this.year, this.month, this.date);
            }

        },
        dateSelected(e) {
            this.date = parseInt(this.$refs.date_select.value);
            console.log("day_select");
            if (this.mready) {
                this.$refs.mview.updateDate(this.year, this.month, this.date);
            }
            window.scroll(0, 1000);
        },
        dayClick(day){
            let newMonthIndex = -1;
            /**@type {HTMLOptionsCollection} */
            let moptions = this.$refs.month_select.options;
            for(let i = 0; i <= moptions.length; i++){
                if (moptions[i].value == day.month){
                    newMonthIndex = i;
                    break;
                }
            }
            this.$refs.month_select.selectedIndex = newMonthIndex;
            this.month = parseInt(this.$refs.month_select.value);
            console.log("month_select");
            let date = new Date(this.year, this.month, 0);
            this.spawnDate(date.getDate());
            let newDateIndex = -1;
            /**@type {HTMLOptionsCollection} */
            let doptions = this.$refs.date_select.options;
            for(let i = 0; i <= doptions.length; i++){
                if (doptions[i].value == day.date){
                    newDateIndex = i;
                    break;
                }
            }
            this.$refs.date_select.selectedIndex = newDateIndex;
            this.date = parseInt(this.$refs.date_select.value);
            this.$refs.mview.updateDate(this.year, this.month, this.date);
            this.openDview();
        },
        openDview(){
            this.toDview = true;
            window.scroll(0,-1000);
        },
        closeDview(){
            this.toDview = false;
            this.$refs.mview.spawnMonthPage();
            window.scroll(0,1000);
        }
    }
});
app.component('mview', {
    mounted() {
        switch (this.passin_month) {
            case 1:
                this.month_literal = `${this.passin_year}, Jan`;
                break;
            case 2:
                this.month_literal = `${this.passin_year}, Feb`;
                break;
            case 3:
                this.month_literal = `${this.passin_year}, Mar`;
                break;
            case 4:
                this.month_literal = `${this.passin_year}, Apr`;
                break;
            case 5:
                this.month_literal = `${this.passin_year}, May`;
                break;
            case 6:
                this.month_literal = `${this.passin_year}, Jun`;
                break;
            case 7:
                this.month_literal = `${this.passin_year}, Jul`;
                break;
            case 8:
                this.month_literal = `${this.passin_year}, Aug`;
                break;
            case 9:
                this.month_literal = `${this.passin_year}, Sep`;
                break;
            case 10:
                this.month_literal = `${this.passin_year}, Oct`;
                break;
            case 11:
                this.month_literal = `${this.passin_year}, Nov`;
                break;
            case 12:
                this.month_literal = `${this.passin_year}, Dec`;
                break;
        }
    },
    props: {
        passin_year: Number,
        passin_month: Number,
        passin_date: Number,
    },
    emits: ['dc'],
    data() {
        return {
            selected_year: this.passin_year,
            selected_month: this.passin_month,
            selected_date: this.passin_date,
            month_literal: ""
        }
    },
    updated() {
        this.spawnMonthPage();
    },
    template:
        /*html*/
        `
    <table id="mview" ref="mtb">
        <thead>
            <th ref="mth_month" colspan="7">{{this.month_literal}}</th>
        </thead>
        <thead>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thur</th>
            <th>Fri</th>
            <th>Sat</th>
        </thead>
        <tbody ref="mtbody"></tbody>
    </table>
    `,
    methods: {
        spawnMonthPage() {
            let tbody = this.$refs.mtbody;
            tbody.innerHTML = null;                        
            let month_day = new Date(this.selected_year, this.selected_month-1, 1);
            for (let w = 0; w < 5; w++) {
                let week = document.createElement("tr");
                for (let d = 0; d < 7; d++) {
                    let day = document.createElement("td");
                    if ((w+d)%2==0){
                        day.classList.add("mtd1");
                    }else{
                        day.classList.add("mtd2");
                    }
                    if (month_day.getDay() != d){
                        let bias = month_day.getDay()-d;
                        month_day = new Date(month_day.getFullYear(), month_day.getMonth(), month_day.getDate()-bias);
                    }
                    day.date = {
                        year:month_day.getFullYear(),
                        month:month_day.getMonth()+1,
                        date:month_day.getDate()
                    };
                    day.innerHTML = month_day.getDate();
                    if (month_day.getMonth() != this.selected_month-1){
                        day.classList.add("notThisMonth");
                    }else{
                        
                    }
                    if (month_day.getFullYear() == this.selected_year && month_day.getMonth()+1 == this.selected_month
                    && month_day.getDate() == this.selected_date){
                        day.classList.add("selectedDate");
                        day.style = "border: 3px dashed blue;";
                    }
                    if (window.localStorage.getItem(`${month_day.getFullYear()}/${month_day.getMonth()+1}/${month_day.getDate()}`) != null){
                        day.classList.add("hasTodo");
                    };
                    day.addEventListener("click", ()=>{
                        this.emitDayClick("dc", day.date);
                    });
                    week.append(day);
                    month_day = new Date(month_day.getFullYear(), month_day.getMonth(), month_day.getDate()+1);
                }
                tbody.append(week);
            }
            this.$refs.mtb.append(tbody);
            viewport.style.height = body.offsetHeight + "px"; //adjust the canvas' size!
        },
        emitDayClick(eventName, date){
            this.$emit("dc", date);
        },
        updateDate(year, month, date) {
            this.selected_year = year;
            this.selected_month = month;
            this.selected_date = date;
            switch (month) {
                case 1:
                    this.month_literal = `${year}, Jan`;
                    break;
                case 2:
                    this.month_literal = `${year}, Feb`;
                    break;
                case 3:
                    this.month_literal = `${year}, Mar`;
                    break;
                case 4:
                    this.month_literal = `${year}, Apr`;
                    break;
                case 5:
                    this.month_literal = `${year}, May`;
                    break;
                case 6:
                    this.month_literal = `${year}, Jun`;
                    break;
                case 7:
                    this.month_literal = `${year}, Jul`;
                    break;
                case 8:
                    this.month_literal = `${year}, Aug`;
                    break;
                case 9:
                    this.month_literal = `${year}, Sep`;
                    break;
                case 10:
                    this.month_literal = `${year}, Oct`;
                    break;
                case 11:
                    this.month_literal = `${year}, Nov`;
                    break;
                case 12:
                    this.month_literal = `${year}, Dec`;
                    break;
            }
        },
        test() {
            console.log(this.selected_year);
            console.log(this.selected_month);
            console.log(this.selected_date);
        }
    }
});
app.component('dview',{
    mounted(){
        /**@type {HTMLDivElement} */
        let exit = this.$refs.exit;
        let todotext = this.$refs.todotext;
        let date = new Date(this.passin_year, this.passin_month-1, this.passin_date);
        exit.addEventListener("click",()=>{
            if (todotext.value != ""){
                window.localStorage.setItem(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`,todotext.value);
            }else{
                window.localStorage.removeItem(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`);
            };            
            this.emitClose();
        });
        if (window.localStorage.getItem(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`) != null){
            this.todo = localStorage.getItem(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`);
        };        
    },
    props: {
        passin_year: Number,
        passin_month: Number,
        passin_date: Number,
    },
    data(){
        return{
            todo : "",
        };
    },
    emits:['close'],
    template:
    /*html*/
    `
    <div id="dview_wrapper" ref="dview_wrapper">
        <div id="todoDiv" ref="todoDiv">
            <div id="exit" ref="exit" style="font-size:5em;color:white">X</div>
            <textarea ref="todotext" cols="100" rows="20">{{todo}}</textarea>
        </div>
    </div>
    `,
    methods:{
        emitClose(){
            this.$emit('close',null);
        }
    }
});

app.mount("#app");