export class MessageBuilderData{
    _sender;
    _message;
    get sender(){
        return this._sender;
    }
    set sender(a){
        this._sender = a;
    }
    get message(){
        return this._message;
    }
    set message(a){
        this._message = a;
    }
    getPlayers(name){}
    getPlayer(name){}
}