import { Table } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './newIssuseStyles.module.css'
import NewIssueButton from './NewIssueButton'

const loading = () => {
    const issues = [1, 2, 3, 4, 5]
    return (
        <div>
            <NewIssueButton />
            <Table.Root variant="surface" className="bg-yellow-200">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={styles.tableCellDisplay}>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={styles.tableCellDisplay}>CreateAt</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue}>
                            <Table.Cell >
                                <Skeleton />

                            </Table.Cell>
                            <Table.Cell className={styles.tableCellDisplay}><Skeleton /></Table.Cell>
                            <Table.Cell className={styles.tableCellDisplay}><Skeleton /></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root >
        </div>
    )
}
export default loading