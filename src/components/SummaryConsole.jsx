import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/esm/CardBody'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import CodeSnippet from './CodeSnippet'

export default function SummaryConsole({ summary }) {
  return (
    <Card className="console h-50 mb-3 shadow"  >
        <CardHeader>
            <i className="bi bi-terminal pl-6"></i> Summary
        </CardHeader>      
        <CardBody style={{ whiteSpace: 'pre-line' }} className='consoleBody' >
            {'C:\\users\\developer>type summary.txt'}
            <br />
            <mark className='lh-lg'>{summary || ''}</mark>
            <br />
            {'C:\\users\\developer>_'}
        </CardBody>
    </Card>
  )
}
