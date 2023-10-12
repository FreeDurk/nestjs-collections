import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TodoItem } from './todo-items.entity';

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // RELATIONS

  @OneToMany(() => TodoItem, (todoItem) => todoItem.todo)
  todoItem: TodoItem[];
}
