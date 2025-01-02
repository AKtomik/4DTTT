class AnchorConstraintType {
	static MIDDLE=0;
	static LEFT=1;
	static RIGHT=2;
}

class AnchorRatioType {
	static NONE=0;
	static EQUALMIN=1;
	static EQUALMAX=2;
}

class Anchor {
	//make
	constructor(anchorPos, sizePos, XandYTypes, ratioType=AnchorRatioType.NONE) {
		this.anchorPos=anchorPos;
		this.sizePos=sizePos;
		
		this.topCoord=[null, null];
		this.sizeCoord=[null, null];


		this.constraints=XandYTypes;
		this.ratio=ratioType;
			this.resize();
	}

	resize()
	{
		//size
		switch (this.ratio)
		{
			case AnchorRatioType.NONE: this.sizeCoord=[Scale.x(this.sizePos[0]),Scale.y(this.sizePos[1])]; break;
			case AnchorRatioType.EQUALMIN: this.sizeCoord=[Scale.min(this.sizePos[0]),Scale.min(this.sizePos[1])]; break;
			case AnchorRatioType.EQUALMAX: this.sizeCoord=[Scale.max(this.sizePos[0]),Scale.max(this.sizePos[1])]; break;
		}
		//top
		let topCoord=Scale.xy(this.anchorPos.slice());
		for (let i of [0,1])
		{
			switch (this.constraints[i])
			{
				case (AnchorConstraintType.LEFT): {
					topCoord[i]-=this.sizeCoord[i];
				} break;
				case (AnchorConstraintType.MIDDLE): {
					topCoord[i]-=(this.sizeCoord[i]/2);
				} break;
				case (AnchorConstraintType.RIGHT): {
				} break;
			}
		}
		this.topCoord=topCoord;
	}

	//get
	pos(justPos) {//get {coordinates} from {0 to 1 position}
		return [
			(this.topCoord[0]+justPos[0]*this.sizeCoord[0]),
			(this.topCoord[1]+justPos[1]*this.sizeCoord[1])
		]
	}

	size(justSize) {//get {distance to origin} from {0 to 1 position}
		return [
			(justSize[0]*this.sizeCoord[0]),
			(justSize[1]*this.sizeCoord[1])
		]
	}
}