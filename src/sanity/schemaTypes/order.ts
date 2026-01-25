import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Замовлення',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Номер замовлення',
      type: 'string',
    }),
    defineField({
      name: 'clientName',
      title: "Ім'я клієнта",
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Телефон',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Статус',
      type: 'string',
      options: {
        list: [
          { title: 'Новий', value: 'new' },
          { title: 'В роботі', value: 'processing' },
          { title: 'Виконано', value: 'done' },
          { title: 'Скасовано', value: 'cancelled' },
        ],
        layout: 'radio'
      },
      initialValue: 'new'
    }),
    defineField({
      name: 'products',
      title: 'Товари',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Назва' },
            { name: 'quantity', type: 'number', title: 'Кількість' },
            { name: 'price', type: 'number', title: 'Ціна' },
          ]
        }
      ]
    }),
    defineField({
      name: 'totalPrice',
      title: 'Сума замовлення',
      type: 'number',
    }),
    defineField({
      name: 'createdAt',
      title: 'Дата створення',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
  ],
})