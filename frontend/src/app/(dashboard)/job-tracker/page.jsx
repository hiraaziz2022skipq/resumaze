// Third-party Imports
import classnames from 'classnames'



// Util Imports
import { commonLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from '@views/job-tracker/styles.module.css'
import JobTracker from '@/views/job-tracker/Index'

const Page = () => {
  return (
    <div
      className={classnames(
        commonLayoutClasses.contentHeightFixed,
        styles.scroll,
        'is-full overflow-auto pis-2 -mis-2'
      )}
    >
      <JobTracker />
    </div>
  )
}

export default Page
