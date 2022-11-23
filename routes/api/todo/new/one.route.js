const Todo = require('../../../../models/Todo.model')
const {validationResult} = require("express-validator");

module.exports = async (req, res) => {
    try{
        /**
         * Вытаскиваем идентификатор пользователя из req.auth. Которые мы получили в Auth middleware
         */
        const { user_id } = req.auth
        /**
         * Получаем название и текст todo
         */
        const {name, text} = req.body

        /**
         * Вытаскиваем ошибки из check middleware
         * @type {Result<{param: "_error", msg: any, nestedErrors: ValidationError[], location?: undefined, value?: undefined} | {location: Location, param: string, value: any, msg: any, nestedErrors?: unknown[]}>}
         */
        const validationErrors = validationResult(req)
        /**
         * Если ошибки есть -- возвращаем массив с ошибками
         */
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({
                error: validationErrors
            })
        }

        /**
         * Создаём новый todo
         * @type {HydratedDocument<InferSchemaType<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>>>, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>>, "TInstanceMethods">, IfEquals<{}, {}, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>>, "TVirtuals">, {}>> & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>>, "TStaticMethods">}
         */
        const todoObject = new Todo({
            name,
            text,
            owner: user_id
        })
        /**
         * Сохраняем новый todo
         * @type {module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown extends Document ? Require_id<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> : (Document<unknown, any, module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> & Require_id<module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? DocType : unknown> & module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? TVirtuals : unknown & module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? TInstanceMethods : unknown) & module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, ObtainDocumentType<any, EnforcedDocType, TPathTypeKey>> extends Schema<infer EnforcedDocType, infer M, infer TInstanceMethods, infer TQueryHelpers, infer TVirtuals, infer TStaticMethods, infer TPathTypeKey, infer DocType> ? TStaticMethods : unknown}
         */
        const todo = await todoObject.save()

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