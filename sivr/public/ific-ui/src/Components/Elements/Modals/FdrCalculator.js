import React, {Component} from 'react';

class FdrCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            p_amount:0,
            duration:0,
            interest_rate:0,
            totalAmount:0,
        }
        this.calculateFdrAmount = this.calculateFdrAmount.bind(this);
    }

    calculateFdrAmount()
    {
        const p_amount = parseInt(this.state.p_amount);
        const duration = parseInt(this.state.duration);
        const interest_rate = parseFloat(this.state.interest_rate);
        let InerestTotal = 0;
        if (p_amount && duration && interest_rate){
            // (((Principal Amount*Interest Rate * Tenure in Month)/12)/100)
            InerestTotal =((p_amount * interest_rate * duration)/12/100);
        }
        this.setState({totalAmount:InerestTotal});

    }

    
    


    render() {
        const {totalAmount} = this.state;
        return (
            <>
                <div className="g-fdr-calculator-overlay">
                    <div className="g-fdr-calculator-area">
                        <div className="fdr-close" onClick={this.props.onClose}>
                            <i className="bi bi-x-lg"></i>
                        </div>

                        <div className="text-center mt-2">
                            <h5>Calculate FDR</h5>
                        </div>

                        <form action="">
                            <div className="form-group">
                                <label htmlFor="priciple-amount">Principle Amount:</label>
                                <input onChange={(e)=> this.setState({p_amount:e.target.value})}  className="form-control" type="number" name="" id="principle-amount"
                                       placeholder="Enter Principle Amount"/>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor='label-name'>Select Duration:</label>
                                <select onChange={(e)=>this.setState({duration:e.target.value})} className="form-select" aria-label="select option" id="label-name">  
                                <option value="0">--Please choose an option--</option>
                                    <option value="1">1 Month</option>
                                    <option value="3">3 Months</option>
                                    <option value="6">6 Months</option>
                                    <option value="12">1 Year</option>
                                    <option value="24">2 Years</option>
                                    <option value="36">3 Years</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="w-100" htmlFor="priciple-amount">Interest Rate:
                                    <span className="interest-percentage">
                                      <input onChange={(e)=> this.setState({interest_rate:e.target.value})} className="form-control" type="number" name="" id="principle-amount"
                                             />
                                    <input className="form-control btn btn-default btn-secondary" type="button"
                                           value="%"/>
                                </span>

                                </label>
                            </div>

                            <a  onClick={this.calculateFdrAmount} href="javascript:void(0);" className="btn btn-danger">Submit</a>

                            <div className="fdr-result-area  mt-2">
                                <span className="fdr-result">Interest Amount is : {totalAmount !=0 ? <> {totalAmount.toFixed(2)} BDT</> :''} </span>
                            </div>

                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default FdrCalculator;
