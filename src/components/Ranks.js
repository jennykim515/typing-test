import { data } from "jquery";
import { useEffect, useState } from "react"
import '../style/Rank.css'

function Ranks() {
    const [ranks, setRanks] = useState([])

    useEffect(() => {
        async function getResponse() {
            const response = await fetch(
                'https://typing-test-apis.herokuapp.com/api/',
                {
                    method: 'GET',
                }
            );
            const data = await response.json(); // Extracting data as a JSON Object from the response

            setRanks(data)
            console.log(data)
        }
        getResponse()
    }, [])

    return (
        <div className="container">
            <h1>Leaderboard</h1>
            <table>
                <th>Name</th>
                <th>Score</th>
                <th>League</th>
                <th>Date</th>
                {
                    ranks.map((user, index) => {
                        if (index < 30) {
                            let date = new Date(user.createdAt)
                            return <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.score}</td>
                                <td>{user.league}</td>
                                <td>{(date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()}</td>
                            </tr>
                        }
                    })
                }
            </table>
        </div>
    )
}

export default Ranks;