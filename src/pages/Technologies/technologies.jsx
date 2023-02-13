import TechBadge from '../../features/tech-badge/techBadge';
import styles from './technologies.module.css';

export default function Technologies() {
  const techs = [
    'Cloud Computing (AWS)',
    'Python',
    'Vagrant',
    'Linux and bash',
    'Terraform',
    'Git',
    'Docker',
    'Kubernetes',
    'Jenkins (CI/CD)',
    'Ansible',
    'Prometheus (Monitoring)',
    'Grafana (Monitoring)',
    'Markdown'
  ]
  return (
    <div className={styles.content}>
      {techs.map(t => <TechBadge title={t} key={t} />)}
    </div>
  )
}
