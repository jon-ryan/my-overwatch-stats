class Entry{
    //
    constructor(id, sr, matchEnd, scoreBlue, scoreRed, showContentDelete){
        this.id = id;
        this.sr = sr;
        this.matchEnd = matchEnd;
        this.scoreBlue = scoreBlue;
        this.scoreRed = scoreRed;
        this.showContentDelete = showContentDelete;
    }

    get toggleShowContentDelete(){
        this.showContentDelete = !this.showContentDelete;
        return this.showContentDelete;
    }

    get id(){
        return this.id;
    }

    get sr(){
        return this.sr;
    }

    get matchEnd(){
        return this.matchEnd;
    }

    get showContentDelete(){
        return this.showContentDelete
    }
}