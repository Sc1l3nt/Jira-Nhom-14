import { Avatar, Card, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import '../../assets/scss/ProjectMobile/ProjectCard.scss'
import { Link } from 'react-router-dom'

const ProjectCard = (props) => {
    const [className, setClassName] = useState('')
    const { project, handleCard, showConfirmDeleteProjectModal } = props

    useEffect(() => {
        switch (project.categoryName) {
            case 'Dự án web': {
                setClassName('web')
                break
            }
            case 'Dự án phần mềm': {
                setClassName('software')
                break
            }
            case 'Dự án di động': {
                setClassName('mobile')
                break
            }
            default: {
                console.log('error')
                break;
            }
        }
    }, [project.categoryName])

    return (
        <div className='cardProject pt-3'>
            <Card
                bordered={false}
                className='position-relative card-antd'
                style={{ width: 300, marginTop: 16 }}
                actions={[
                    <Link to={`/projects/${project.id}/edit`}>
                        <EditOutlined className='fs-4' />
                    </Link>,
                    <DeleteOutlined className='fs-4' onClick={showConfirmDeleteProjectModal(project)}/>,
                ]}
            >
                <div className={`backGround ${className}`} />
                <div className='content' onClick={() => { handleCard(project.id) }}>
                    <div className='title-card'>
                        <h2>{project.projectName.toUpperCase()}</h2>
                        <p>{project.categoryName}</p>
                    </div>
                    <div className='body-card'>
                        <div className='d-flex justify-content-between'>
                            <Avatar.Group
                                maxCount={2}
                                maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                            >
                                {project.members.map((member) => (
                                    <Tooltip title={member.name} key={member.userId}>
                                        <Avatar src={member.avatar} />
                                    </Tooltip>
                                ))}
                            </Avatar.Group>
                            <h6 className='creator ms-3'>Creator:<br />{project.creator.name.length < 25 ? project.creator.name : project.creator.name.substring(0, 25) + '...'}</h6>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ProjectCard