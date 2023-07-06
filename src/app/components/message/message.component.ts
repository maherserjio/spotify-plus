import { Component, Input } from '@angular/core';
import { IMessageData } from './message.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() data!: IMessageData;
}
