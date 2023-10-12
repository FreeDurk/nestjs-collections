import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Todo } from './todo.entity';

@Entity({ name: 'todo-item' })
export class TodoItem {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => Todo, (todo) => todo.todoItem)
  todo: Todo;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
