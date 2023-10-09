import React, {Component} from 'react';
import styles from "./TableElement.module.css";

class TableElement extends Component {

    getTableRow(rowData) {
        return <tr>{rowData}</tr>;
    }

    createTableRow = (tableHead,tableBody) => {
        return (
           <>
               {tableHead.map((item, i) => {
                   return <tr   key={i}>{this.createTableCol(tableHead,tableBody,i)}</tr>;
               })}
           </>
        );
    };
    createTableCol = (tableHead,tableBody,i) => {
        return (
            <>
                <th  style={{textAlign:"left",padding:'5px'}}  >{tableHead[i]}</th><td  style={{textAlign:"left",padding:'5px'}} >{tableBody?.[0][i]!==undefined ? tableBody?.[0][i] :''}</td>
            </>
        );
    };

    render() {
        const language = this.props.language;
        const tableHead = this.props.tableHead[language];
        const tableBody = this.props.tableBody[language];
        const tableType = this.props.tableType;
        let tableHeadData = [];
        for (let i = 0; i < this.props.columnCount; i++) {
            tableHeadData.push(<th style={{textAlign:"left",padding:'5px'}}>{tableHead[i]}</th>);
        }
        tableHeadData = this.getTableRow(tableHeadData);


        let tableBodyData = [];
        for (let i = 0; i < tableBody.length; i++) {
            let rowData = [];
            for (let j = 0; j < this.props.columnCount; j++) {
                rowData.push(<td style={{textAlign:"left",padding:'5px'}}>{tableBody[i][j]}</td>);
            }
            tableBodyData.push(this.getTableRow(rowData));
        }
        return (
            <div className={"table table-responsive"}>
                <div className={styles.mtbTableArea}>
                    {tableType==='SVT'||tableType==='DVT'?
                        <>
                            <table className={"table table-hover table-bordered " + styles.tableElement}>
                                {this.createTableRow(tableHead,tableBody)}
                            </table>
                        </>
                        :
                        <>
                        <table className={"table table-hover table-bordered " + styles.tableElement}>
                            {tableHeadData}
                            {tableBodyData}
                        </table>
                        </>
                    }
                    {/*<table className={"table table-hover table-bordered " + styles.tableElement}>*/}
                    {/*    {tableType==='SVT'||tableType==='DVT'?this.createTableRow(tableHead,tableBody):<>*/}
                    {/*        {tableHeadData}*/}
                    {/*        {tableBodyData}*/}
                    {/*    </>}*/}
                    {/*</table>*/}
                </div>
            </div>
        );
    }
}

export default TableElement;
