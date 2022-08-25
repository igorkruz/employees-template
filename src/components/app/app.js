import { Component } from 'react/cjs/react.production.min';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import Employerslist from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name:'ivan' , salary: 800, increase: false, rise:false, id: 1},
        {name:'petro' , salary: 1500, increase: false, rise:true, id: 2},
        { name: 'taras', salary: 1800, increase: false, rise: false, id: 3 },
      ],
      term: '',
      filter: 'all'
    }
    this.maxId = 4
  }

  deleteItem = (id) => {
    this.setState(({data})=> {
      return { data: data.filter(item => item.id !== id) }
    })
  }
  
  addItem = (name, salary) => {
    const newItem = {
    name, 
    salary,
    increase: false,
    rise: false,
    id: this.maxId++
    }
    if (name.length <=3 && salary === '') {
      return alert('Заповніть правельно поле ПІБ та З/П')
    }

    if (name.length <= 3 ) {
      alert(`Поле ПІБ заповнено неправильно`)
      return console.error(' missing value name')
    }

    if ( salary === '') {
      alert(`Поле З/П заповнено неправильно`)
      return console.error(' missing value salary')
    }

      this.setState(({data}) => {
        const newArr = [...data, newItem];
        return {
          data: newArr
        }
      });
  }

  onToggleIncrease = (id) => {
    // this.setState(({ data }) => {
    //   const index = data.findIndex(elem => elem.id === id);

    //   const old = data[index];
    //   const newItem = { ...old, increase: !old.increase };
    //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    //   return {
    //     data: newArr
    //   }
    // })

    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, increase: !item.increase };
        }
        return item;
      })
    }))
  }

  
  onToggleRise = (id) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, rise: !item.rise };
        }
        return item;
      })
    }))
  }

  onAllEmployees = () => {
    this.setState(state => {
      return {data: this.state.data.length}

    })
  }

  searchEmployer = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise': 
          return items.filter(item => item.rise)
      case 'moreThen1000': 
        return items.filter(item => item.salary > 1000 )
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }


  render() {
    const {data, term, filter} = this.state
    const allEmployees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const filteredData = this.filterPost(this.searchEmployer(data, term), filter);
    return (
      <div className="app">
        <AppInfo
          allEmployees={allEmployees}
          increased={increased} />
              
      <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch } />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
      </div>
            
        <Employerslist
          data={filteredData}
          onDelete={this.deleteItem}
          onToggleIncrease={this.onToggleIncrease}
          onToggleRise={this.onToggleRise} />
        
        <EmployersAddForm onAdd={this.addItem } />
      </div>  
    );
  }
}

export default App;