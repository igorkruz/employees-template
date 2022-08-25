import './app-info.css'

const AppInfo = (props) => {

    const {allEmployees, increased} = props

    return (
        <div className="app-info">
            <h1>Облік співробітників</h1>
            <h2>Загальна кількість співробітників: { allEmployees}</h2>
            <h2>Премію отримають: {increased}</h2>
        </div>
    )
}
export default AppInfo;