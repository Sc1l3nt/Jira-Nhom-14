import React, { useState } from 'react'
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Search = () => {
    const [options, setOptions] = useState([]);
    const [width, setWidth] = useState('15rem');

    const handleSearch = (value) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value) => {
        console.log('onSelect', value);
    };

    const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    const searchResult = (query) =>
        new Array(getRandomInt(5))
            .join('.')
            .split('.')
            .map((_, idx) => {
                const category = `${query}${idx}`;
                return {
                    value: category,
                    label: (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>
                                {category}
                            </span>
                        </div>
                    ),
                };
            });

    return (
        <AutoComplete
            style={{ width: width, transition: 'all .5s' }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            onFocus={() => setWidth('30rem')}
            onBlur={() => setWidth('15rem')}
        >
            <Input
                allowClear
                placeholder="Search ..."
                prefix={<SearchOutlined className='fs-5 me-2 text-primary' />}
                size="large"
            />
        </AutoComplete>
    );
}

export default Search