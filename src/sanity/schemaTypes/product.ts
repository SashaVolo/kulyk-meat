import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Товари',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва товару',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Ціна (грн)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Фото',
      type: 'image',
      options: {
        hotspot: true, // Дозволяє обрізати фото
      },
    }),
    defineField({
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {
        list: [
          { title: 'М\'ясо', value: 'meat' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Опис',
      type: 'text',
    }),
    defineField({
      name: 'weight',
      title: 'Вага (напр: "за 1 кг")',
      type: 'string',
    }),
  ],
})