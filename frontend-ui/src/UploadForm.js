import React, {Component} from 'react';
import './App.css';

function UploadForm() {
  return (
    <div className="UploadForm">
      <h1>Batch Processing:</h1>
        <FormBatch/>
    </div>
  );
}


export default UploadForm;

class FormBatch extends Component {
    constructor(props) {
        super(props);
        this.state = {selectFile:null,outputVal:false, responseFromServer:null};
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleFile(event){
        //console.log(event.target.value);
        this.setState({[event.target.name]:event.target.files[0]})
    }

    handleUpload = async event=>{
        event.preventDefault();

        const url = "http://localhost:8000/scoreFile";
        //const fileToSend = this.state.selectFile;
        //console.log(fileToSend);
        var formdata = new FormData();
        formdata.append("filePath", this.state.selectFile, this.state.selectFile.name);
        const reqopt = {method:"POST", body:formdata};
        const resp = await fetch(url,reqopt);
        const resp2 = await resp.json();
        //console.log(resp2)

        this.setState({respFromServer:resp2.score})
        //console.log(this.state.outputVal);
        this.setState({outputVal:true});
        //console.log(this.state.responseFromServer)

    }

    render(){

        const iterateData = this.state.respFromServer;
        const checkPoint = this.state.outputVal;
        let finalTableData;
        //console.log(checkPoint)
        if (checkPoint){

            const tableData = iterateData.map((x) =>
                <tr><td>{x[0]}</td> <td>{x[1]}</td></tr>
            );

            finalTableData = <table>
                <tbody>
                <tr><th>Id</th> <th>Probability</th></tr>
                {tableData}
                </tbody>
            </table>
            //console.log(tableData)
        }
        else
        {
            finalTableData = "No Response";
        }


        return (
            <div>
                <form onSubmit={this.handleUpload}>

                    <input type="file" name="selectFile" onChange={this.handleFile}></input>
                    <input type="submit" value="Submit"></input>
                </form>
                <div>{finalTableData}</div>
            </div>

        );
    }

}