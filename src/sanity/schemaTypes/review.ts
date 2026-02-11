import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'review',
    title: 'Відгуки',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Ім\'я клієнта',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'text',
            title: 'Текст відгуку',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Оцінка (1-5)',
            type: 'number',
            validation: (rule) => rule.required().min(1).max(5),
        }),
        defineField({
            name: 'emoji',
            title: 'Аватарка-емодзі',
            type: 'string',
        }),
        defineField({
            name: 'product',
            title: 'Товар',
            type: 'reference',
            to: [{ type: 'product' }],
            description: 'Якщо порожньо — це загальний відгук про магазин',
        }),
        defineField({
            name: 'isApproved',
            title: 'Опубліковано?',
            type: 'boolean',
            description: 'Увімкніть це, щоб відгук з\'явився на сайті',
            initialValue: false,
        }),
    ],
})