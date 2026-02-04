import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ExperienceItem from './ExperienceItem'
import CardBody from 'react-bootstrap/esm/CardBody'
import { sha1FromJob } from '../utils/hash'
import { formatDates } from '../utils/formatDates'
import Badge from 'react-bootstrap/esm/Badge'

export default function ExperienceSection({ experience }) {
  const [hashes, setHashes] = useState({})

  useEffect(() => {
    async function generateHashes() {
      const entries = await Promise.all(
        experience.map(async (job, idx) => {
          const hash = await sha1FromJob(job)
          return [idx, hash]
        })
      )

      setHashes(Object.fromEntries(entries))
    }

    generateHashes()
  }, [experience])

  return (
    <Card>
      <Card.Header>experience.git</Card.Header>
      <Card.Body className="p-1">
        {experience.map((job, idx) => {
          const fullHash = hashes[idx]
          const shortHash = fullHash?.slice(0, 7)

          return (
            <div key={`${job.company}-${job.title}-${idx}`} className="p-xl-3 py-3">
              <div
                className="text-muted small font-monospace mb-1 position-relative "
                title={fullHash}
                style={{ cursor: 'help' }}
                >
                {formatDates(job.dates)}

                <Badge  bg='info' className='merge   text-bg-info position-absolute  top-0 end-0' >{shortHash || '...'} </Badge>
                
              </div>

              <Card style={{backgroundColor:"#2e3440"}}>
                <CardBody>


                  <ExperienceItem job={job} idx={idx} />
                </CardBody>
              </Card>
            </div>
          )
        })}
      </Card.Body>
    </Card>
  )
}
