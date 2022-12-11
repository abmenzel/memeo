import classNames from 'classnames'
import Tag from '../models/Tag'

const Tag = ({ tag, className }: { tag: Tag; className?: string }) => {
	return (
		<p className={classNames('btn-tag', tag.color, className)}>
			{tag.name}
		</p>
	)
}

export default Tag
