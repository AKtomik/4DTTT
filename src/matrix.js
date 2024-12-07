//https://dev.to/ndesmic/fast-matrix-math-in-js-11cj
//used to understand how best optimise that.

class Matrix {
	//build
	constructor(numberOfLine, numberOfColumn)
	{
		this.size=[numberOfLine, numberOfColumn];
		this.data=[];
		this.data.length=numberOfLine*numberOfColumn;
	};
	build_null()
	{
		for (let i=0;i<this.size[0]*this.size[1];i+=1)
		{
			this.data[i]=0;
		}
	}
	build_diag(number)
	{
		if (this.size[0]!=this.size[1])
			throw new Error(`must be a square matrix but is of size (${this.size[0]},${this.size[1]})`);
		const order = this.size[0];
		for (let i=0;i<order;i+=1)
		{
			this.data[i*(order+1)]=number;
		}
	}
	build_identity()
	{
		this.build_null();
		this.build_diag(1);
	};

	//print
	toString()
	{
		let r="[\n";
		for (let i=0;i<this.size[0];i+=1)
		{
			for (let j=0;j<this.size[1];j+=1)
			{
				let str=String(this.data[i*this.size[0]+j]);
				r+="  "+str;
			}
			r+="\n";
		}
		return r+"]";
	}
};