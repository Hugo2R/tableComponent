const ajax = (config) => {
	const xmlhttp = new XMLHttpRequest()

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == XMLHttpRequest.DONE) {
			if (xmlhttp.status == 200) {
				config.success(JSON.parse(xmlhttp.responseText))
			}
			else {
				alert('There was an error')
			}
		}
	}

	xmlhttp.open(config.protocol||"GET", config.url , true)
	xmlhttp.send();
}

const output = document.getElementById('output')

const Table = (props) => {


	const filteredColumns = (item,index) => {

		let tempRow = []

		for (let i = props.columns.length - 1; i >= 0; i--) {
			let { key, format } = props.columns[i]
			if (item[key]){
				if (typeof format == 'function') {
					tempRow[i] = <td key={i}>{format(item[key])}</td>
				} else if (format == 'text') {
					tempRow[i] = <td key={i}>{item[key]}</td>
				} else if (format == 'link') {
					tempRow[i] = <td key={i}><a href={item[key]}>{item[key]}</a></td>
				}
			}
		}
		return (<tr key={index}>{tempRow}</tr>)
	}

	const cells = props.data.map(filteredColumns)

	return (<table>
		<thead><tr>{props.columns.map((itm,idx)=><th key={idx}>{itm.description}</th>)}</tr></thead>
		<tbody>{cells}</tbody>
	</table>)
}

const columns = [
	{
		key: 'name',
		description: 'Full name',
		format: 'text'
	},
	{
		key: 'username',
		description: 'User name',
		format: 'text'
	},
	{
		key: 'address',
		description: 'Address',
		format: (address) => {return (<p><span>{address.street}</span><br /><span>{`${address.suite} ${address.city}`}</span></p>)}
	},
	{
		key: 'website',
		description: 'URL',
		format: 'link'
	}
]

ajax({
	url: 'https://jsonplaceholder.typicode.com/users',
	success: (data) => {
		const component = <div>
			<Table data={data} columns={columns} />
		</div>
		ReactDOM.render(component, output)
	}
})