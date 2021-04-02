import React, {Component} from 'react';
import './App.css';

function Home() {
  return (
    <div className="Home">
      <h1>Enter the details so our system can give you can estimate whether you can get a loan approval</h1>
        <JsonForm/>
    </div>
  );
}

export default Home;


class JsonForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Gender:"Male", Married: "No", Dependents:"No", Education:"Graduate", Self_Employed:"Yes",
            ApplicantIncome:"50000", CoapplicantIncome:"0",LoanAmount:"1000000", Loan_Amount_Term:"24",
            Credit_History:"1", Property_Area:"Urban",Score:1};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit(event){
        //alert(this.state.input1);
        event.preventDefault();
        //this.setState({Score:10})
        const url = "http://localhost:8000/scoreJson"

        const bodyData=JSON.stringify({
            "Gender":this.state.Gender, "Married": this.state.Married, "Dependents":this.state.Dependents,
            "Education":this.state.Education, "Self_Employed":this.state.Self_Employed,"ApplicantIncome":this.state.ApplicantIncome,
            "CoapplicantIncome":this.state.CoapplicantIncome,"LoanAmount":this.state.LoanAmount, "Loan_Amount_Term":this.state.Loan_Amount_Term ,
            "Credit_History":this.state.Credit_History, "Property_Area":this.state.Property_Area,
        });
        const reqOpt = {method:"POST",headers:{"Content-type":"application/json"}, body:bodyData};
        fetch(url,reqOpt)
            .then((resp) => resp.json())
            .then((respJ) => this.setState({Score:respJ.score}))

    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Gender :</td>
                                <td><input type="text" value = {this.state.Gender} name="Gender" onChange={this.handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>Married :</td>
                                <td><input type="text" value = {this.state.Married} name="Married" onChange={this.handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>Dependents :</td>
                                <td><input type="text" value = {this.state.Dependents} name="Dependents" onChange={this.handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>Education :</td>
                                <td><input type="text" value = {this.state.Education} name="Education" onChange={this.handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>Self_Employed :</td>
                                <td><input type="text" value = {this.state.Self_Employed} name="Self_Employed" onChange={this.handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>ApplicantIncome :</td>
                                <td><input type="text" value = {this.state.ApplicantIncome} name="ApplicantIncome" onChange={this.handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>CoapplicantIncome :</td>
                                <td><input type="text" value = {this.state.CoapplicantIncome} name="CoapplicantIncome" onChange={this.handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>LoanAmount :</td>
                                <td><input type="text" value = {this.state.LoanAmount} name="LoanAmount" onChange={this.handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>Loan_Amount_Term :</td>
                                <td><input type="text" value = {this.state.Loan_Amount_Term} name="Loan_Amount_Term" onChange={this.handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>Credit_History :</td>
                                <td><input type="text" value = {this.state.Credit_History} name="Credit_History" onChange={this.handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>Property_Area :</td>
                                <td><input type="text" value = {this.state.Property_Area} name="Property_Area" onChange={this.handleChange}></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="submit" value="submit"></input>
                </form>
            <div>The Probablility of getting approval is {this.state.Score}</div>
            </div>
        );
    }
}