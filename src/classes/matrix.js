//https://dev.to/ndesmic/fast-matrix-math-in-js-11cj
//used to understand how best optimise that.

//mutable class
//use flat array and loop
class Matrix {
	//build
	constructor(numberOfLine, numberOfColumn)
	{
		if (!numberOfLine)
			throw new Error(`not dimension given to the matrix`);
		if (!numberOfColumn)
			numberOfColumn=numberOfLine;

		this.size=[numberOfLine, numberOfColumn];
		this.data=[];
		this.data.length=numberOfLine*numberOfColumn;
		return this;
	};
	copy()
	{
		let resultMatrix=new Matrix(...this.size);
		resultMatrix.data=this.data.slice();
		return resultMatrix;
	}
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
	set_raw(i, v)
	{
		this.data[i] = v;
	}
	set_at(lineIndex, columnIndex, v)
	{
		this.data[lineIndex*this.size[1]+columnIndex] = v;
		return this;
	}
	set_line(lineIndex, array)
	{
		if (array.length!==this.size[1])
			throw new Error(`array's size not the same as matrix's number of column  (${this.size[0]},${this.size[1]})`);

		for (let columnIndex=0;columnIndex<this.size[1];columnIndex++)
		{
			this.set_at(lineIndex, columnIndex, array[columnIndex]);
		}
		return this;
	}
	set_column(columnIndex, array)
	{
		if (array.length!==this.size[0])
			throw new Error(`array's size not the same as matrix's number of line  (${this.size[0]},${this.size[1]})`);

		for (let lineIndex=0;lineIndex<this.size[0];lineIndex++)
		{
			this.set_at(lineIndex, columnIndex, array[lineIndex]);
		}
		return this;
	}

	//get
	get_raw(i)
	{
		return this.data[i];
	}
	get_at(lineIndex, columnIndex)
	{
		return this.data[lineIndex*this.size[1]+columnIndex];
	}

	//operation
	add_with(other)
	{
		if (other.size!==this.size)
			throw new Error(`matrices' sizes are not the same (${this.size[0]},${this.size[1]}) (${other.size[0]},${other.size[1]})`);

		let resultMatrix=new Matrix(...this.size);
		for (let i=0;i<this.size[0]*this.size[1];i++)
		{
			resultMatrix.set_raw(i, this.get_raw(i)+other.get_raw(i));
		}
		return resultMatrix;
	}
	multiply_with(other)
	{
		if (other.size[0]!==this.size[1])
			throw new Error(`first matrix's number of column is not the same as second matrix's number of line (${this.size[0]},${this.size[1]}) (${other.size[0]},${other.size[1]})`);

		let resultMatrix=new Matrix(this.size[0], other.size[1]);
		for (let lineIndex=0;lineIndex<this.size[0];lineIndex++)
		{
			for (let columnIndex=0;columnIndex<other.size[1];columnIndex++)
			{
				let value=0;
				for (let bothIndex=0;bothIndex<this.size[1];bothIndex++)
				{
					value+=(this.get_at(lineIndex, bothIndex)*other.get_at(bothIndex, columnIndex));
				}
				resultMatrix.set_at(lineIndex, columnIndex, value);
			}
		}
		return resultMatrix;
	}

	//print
	toString()
	{
		let r="[\n";
		for (let lineIndex=0;lineIndex<this.size[0];lineIndex++)
		{
			for (let columnIndex=0;columnIndex<this.size[1];columnIndex++)
			{
				let str=String(this.data[lineIndex*this.size[1]+columnIndex]);
				r+="  "+str;
			}
			r+="\n";
		}
		return r+"]";
	};
};