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
        const { todo_id } = req.params
        /**
         * Поиск todo по id и создателю
         * @type {awaited Query<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown extends Document ? Require_id<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> : (Document<unknown, any, module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> & Require_id<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> & module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? TInstanceMethods : unknown), module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown extends Document ? Require_id<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> : (Document<unknown, any, module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> & Require_id<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> & module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? TInstanceMethods : unknown), module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? TQueryHelpers : unknown, module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> & module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? TQueryHelpers : unknown}
         */
        const todo = await Todo.findOne({ owner: user_id, _id: todo_id })

        /**
         * Если не нашлось todo возвращаем ошибку
         */
        if(!todo){
            return res.status(500).json({
                message: "Todo не найден"
            })
        }

        /**
         * Ищем и удаляем todo по id
         */
        await Todo.findOneAndDelete({_id: todo_id})

        /**
         * Оповещаем об успешном удалении
         */
        return res.json({
            message: "Todo успешно удалён"
        })

    }catch (e) {
        /**
         * Возвращаем необработанную ошибку
         */
        return res.status(500).json({
            error: e.message
        })
    }
}