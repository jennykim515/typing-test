import { data } from "jquery";
import { useEffect, useState } from "react"
import '../style/Rank.css'

function Ranks() {
    const [ranks, setRanks] = useState([])

    async function deleteUser(id) {
        const response = await fetch(
            `https://typing-test-apis.herokuapp.com/api/delete/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            }
        );
    }

    useEffect(() => {
        async function getResponse() {
            const response = await fetch(
                'https://typing-test-apis.herokuapp.com/api/',
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }
            );
            const data = await response.json(); // Extracting data as a JSON Object from the response
            data.sort(function (a, b) {
                return b.score - a.score;
            });
            setRanks(data)
        }
        getResponse()
    }, [])

    return (
        <div className="container">
            <h1>Leaderboard - Top 30</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>WPM</th>
                        <th>League</th>
                        <th>Date</th>
                    </tr>
                </thead>

                {
                    ranks.map((user, index) => {
                        if (index < 1) {
                            let date = new Date(user.createdAt)
                            return <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.score}</td>
                                <td>{user.league}</td>
                                <td>{(date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()}</td>
                            </tr>
                        }
                        else {
                            deleteUser(user.id)
                        }
                    })
                }
            </table>
        </div>
    )
}

export default Ranks;