import { Modal } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { deleteProjectApi, getAllProjectApi } from '../../redux/reducers/projectReducer';

const ProjectsMobile = () => {
    const { projectList } = useSelector((state) => state.projectReducer);
    const dispatch = useDispatch();

    const handleCard = (projectId) => {
        console.log(projectId)
    }

    const showProjectDeletedSuccessfullyModal = () => {
        dispatch(getAllProjectApi());
        Swal.fire({
            title: "Project deleted successfully",
            icon: "success",
            showConfirmButton: false,
        });
    };

    const handleDeleteProject = (projectId) => {
        dispatch(deleteProjectApi(projectId));
        showProjectDeletedSuccessfullyModal();
    };

    const showConfirmDeleteProjectModal = (project) => {
        return () => {
            Modal.confirm({
                title: `Are you sure to delete\n${project.projectName}?`,
                okText: "Delete",
                zIndex: 1050,
                centered: true,
                onOk: () => {
                    handleDeleteProject(project.projectId);
                },
                cancelText: "Cancel",
            });
        };
    };

    const renderCardProject = () => {
        return projectList.map((project, i) => {
            return <div key={i}>
                <ProjectCard project={project} handleCard={handleCard} showConfirmDeleteProjectModal={showConfirmDeleteProjectModal} />
            </div>
        })
    }

    useEffect(() => {
        dispatch(getAllProjectApi());
    }, [dispatch]);

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