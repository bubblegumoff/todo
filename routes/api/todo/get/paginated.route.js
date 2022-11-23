const Todo = require('../../../../models/Todo.model')

module.exports = async (req, res) => {
    try{
        /**
         * Вытаскиваем идентификатор пользователя из req.auth. Которые мы получили в Auth middleware
         */
        const { user_id } = req.auth
        /**
         * Вытаскиваем идентификатор todo из req.params
         */
        const { page } = req.params

        /**
         * Лимит выводимых за раз todos
         * @type {number}
         */
        const limit = 10
        /**
         * Сколько todos пропускаем для вывода
         * @type {number}
         */
        const skip = limit * page - 1
        /**
         * Поиск todos по создателю. С лимитом и пропуском
         * @type {awaited Query<Array<HydratedDocument<InferSchemaType<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>>>, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>>, "TInstanceMethods">, {}>>, module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown extends Document ? Require_id<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> : (Document<unknown, any, module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> & Require_id<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> & module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? TInstanceMethods : unknown), module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? TQueryHelpers : unknown, module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> & module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? TQueryHelpers : unknown}
         */
        const todo = await Todo.find({ owner: user_id }).limit(limit).skip(skip)

        /**
         * Возвращаем todos
         */
        return res.json(todo)

    }catch (e) {
        /**
         * Возвращаем необработанную ошибку
         */
        return res.status(500).json({
            error: e.message
        })
    }
}