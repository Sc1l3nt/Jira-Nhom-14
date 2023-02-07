import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { getAllProjectApi } from '../../redux/reducers/projectReducer';

const ProjectsMobile = () => {
    const { projectList } = useSelector((state) => state.projectReducer);
    const dispatch = useDispatch();

    const handleCard = (projectId) => {
        console.log(projectId)
    }

    const renderCardProject = () => {
        return projectList.map((project, i) => {
            return <div key={i}>
                <ProjectCard project={project} handleCard={handleCard} />
            </div>
        })
    }

    useEffect(() => {
        dispatch(getAllProjectApi());
    }, []);

    return (
        <div className='container mt-2'>
            <div className='title'>
                <h4>Project List</h4>
            </div>
            <div className='mx-4'>
                {renderCardProject()}
            </div>
        </div>
    )
}

export default ProjectsMobile