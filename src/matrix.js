//https://dev.to/ndesmic/fast-matrix-math-in-js-11cj
//used to understand how best optimise that.

//mutable class
//use flat array and loop
class Matrix {
	//build
	constructor(numberOfLine, numberOfColumn)
	{
		this.size=[numberOfLine, numberOfColumn];
		this.data=[];
		this.data.length=numberOfLine*numberOfColumn;
		return this;
	};
	build_null()
	{
		for (let i=0;i<this.size[0]*this.size[1];i++)
		{
			this.data[i]=0;
		}
		return this;
	};
	build_diag(number)
	{
		if (this.size[0]!=this.size[1])
			throw new Error(`must be a square matrix but is of size (${this.size[0]},${this.size[1]})`);
		const order = this.size[0];
		for (let i=0;i<order;i++)
		{
			this.data[i*(order+1)]=number;
		}
		return this;
	};
	build_identity()
	{
		this.build_null().build_diag(1);
		return this;
	};

	//set
	set_at(lineIndex, columnIndex, v)
	{
		this.data[lineIndex*this.size[0]+columnIndex] = v;
		return this;
	}
	set_line(lineIndex, array)
	{
		if (array.length!=this.size[1])
			throw new Error(`array's size not the same as matrix's number of column  (${this.size[0]},${this.size[1]})`);
		for (let columnIndex=0;columnIndex<this.size[1];columnIndex++)
		{
			this.set_at(lineIndex, columnIndex, array[columnIndex]);
		}
		return this;
	}
	set_column(columnIndex, array)
	{
		if (array.length!=this.size[0])
			throw new Error(`array's size not the same as matrix's number of line  (${this.size[0]},${this.size[1]})`);
		for (let lineIndex=0;lineIndex<this.size[1];lineIndex++)
		{
			this.set_at(lineIndex, columnIndex, array[lineIndex]);
		}
		return this;
	}

	//get
	get_at(lineIndex, columnIndex)
	{
		return this.data[lineIndex*this.size[0]+columnIndex];
	}

	//print
	toString()
	{
		let r="[\n";
		for (let lineIndex=0;lineIndex<this.size[0];lineIndex++)
		{
			for (let columnIndex=0;columnIndex<this.size[1];columnIndex++)
			{
				let str=String(this.data[lineIndex*this.size[0]+columnIndex]);
				r+="  "+str;
			}
			r+="\n";
		}
		return r+"]";
	};
};