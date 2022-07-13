

const Table = (props) => {
    return(
        <table className="contact-table">
            <thead>
                <tr>
                    <th className='first'>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>contact</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
            
        </table>
    )
}

export default Table;