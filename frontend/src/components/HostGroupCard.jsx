import React from 'react'
import HostCard from './HostCard'

const HostGroupCard = ({hostGroup,refetchHosts,groupNames}) => {
  return (
    <div key={hostGroup._id} className="flex flex-col py-6 border-b-2 border-gray-600 border-dashed">
         
            <h2 className="text-lg font-semibold mb-4 ">{hostGroup.name} ({hostGroup.devices.length})</h2>
          
          {hostGroup.devices.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {hostGroup.devices.map((host) => (
                <HostCard key={host._id} host={host} refetchHosts={refetchHosts} groupNames={groupNames} />
              ))}
            </div>
          )}
        </div>
  )
}

export default HostGroupCard