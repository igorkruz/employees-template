import { Component } from 'react/cjs/react.production.min';

import './employears-add-form.css'

class EmployersAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValurChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: ''
        })
    }
    
    
    render() {
        
        const { name, salary } = this.state;
        return (
            <div className="app-add-form">
                <h3>Добавити нового співробітника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        name='name'
                        value={name}
                        placeholder="Ім'я нового співробітника?" onChange={this.onValurChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        name='salary'
                        value={salary}
                        placeholder="З/П в $?" onChange={this.onValurChange} />
    
                    <button type="submit"
                            className="btn btn-outline-light" >Добавити</button>
                </form>
            </div>
        )
    }
}

export default EmployersAddForm;

