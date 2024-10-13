
const Analysis = (): JSX.Element => {

    return (
        <div>
            <span>月</span>
            <span>年</span>
            <div>
                <button>«</button>
                2024年10月
                <button>»</button>
            </div>
            <span>支出計:</span>
            <span>一日平均:</span>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>タイプ</th>
                        <th>金額</th>
                        <th>割合</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>食費</td>
                        <td>344</td>
                        <td>100%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )


};

export default Analysis;