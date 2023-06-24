const {Schema, model} = require('mongoose');

const messageSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    mensaje:{
        type: String,
        require: true
    }
},{
    timestamps:true
});

messageSchema.method('toJSON', function () {
    const {__v, _id,  ...object} = this.toObject();
    return object;

})

module.exports = model('Mensaje', messageSchema);