import {Component, OnInit} from '@angular/core';
import {fabric} from 'fabric';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    canvas: any;
    counter = 0;
    customId = 'customId';
    data: any[];

    ngOnInit(): void {
        this.canvas = new fabric.Canvas('myCanvas');
        // this.canvas.add(new fabric.IText('Hello Fabric!'));
    }

    getId(): string {
        return 'dio_' + this.counter++;
    }

    onLoad(): void {
        const ob = {version: '4.3.1', objects: []};
        const arr = [];
        this.data.forEach(d => {
            const json: any = JSON.parse(d.data);
            json[this.customId] = d.id;
            arr.push(json);
        });
        ob.objects = arr;
        this.canvas.loadFromJSON(ob, () => {
            this.canvas.renderAll();
        }, (o, object) => {
            console.log(o, object);
        });
    }

    onAdd(): void {
        const rect: any = new fabric.Rect({
            left: 100,
            top: 50,
            fill: 'yellow',
            width: 200,
            height: 100,
            objectCaching: false,
            stroke: 'lightgreen',
            strokeWidth: 4,
        });
        // fabric.Image.fromURL('../assets/test.svg', (img) => {
        // this.canvas.add(img);
        // });
        //
        rect[this.customId] = this.getId();
        //
        this.canvas.add(rect);
    }

    onPrint(): void {
        console.log(this.canvas._objects.map(x => ({
            id: x[this.customId],
            data: JSON.stringify(x.toJSON())
        })));
    }

    onSave(): void {
        this.data = this.canvas._objects.map(x => ({
            id: x[this.customId],
            data: JSON.stringify(x.toJSON())
        }));
    }

    onClear(): void {
        this.canvas.loadFromJSON(JSON.parse(`{"version":"4.3.1","objects":[]}`), () => {
            this.canvas.renderAll();
        }, (o, object) => {
            console.log(o, object);
        });
    }

    onDelete(): void {
        const id = prompt('', 'dio_');
        const record = this.canvas.getObjects().find(x => x[this.customId] === id);
        this.canvas.remove(record);
    }
}
