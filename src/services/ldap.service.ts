import { Inject, Injectable } from 'injection-js';
import { ConfigurationService } from '../services/configuration.service';
import SimpleLDAP from 'simple-ldap-search';
import { Logger } from 'ts-log-debug';
import { transform } from 'json-transformer-node';
import { Filter } from './filter';

/**
 * Schnittstelle für alle LDAP-Anfragen.
 */
@Injectable()
export class LDAPService {
  private ldap: SimpleLDAP;
  private config: ConfigurationService;
  private log: Logger;

  constructor( @Inject('Logger') log: Logger,
    config: ConfigurationService) {
    this.config = config;
    this.log = log;
    const conf = this.config.getLDAP('config');
    conf.dn = process.env.LDAP_DN || conf.dn;
    conf.password = process.env.LDAP_PASSWORD || conf.password;
    this.ldap = new SimpleLDAP(conf);
  }

  /**
   * Stellt eine LDAP-Anfrage und transformiert die Attribute.
   * @param filter Die Filterbelegung für die LDAP-Anfrage. Es wird nur nach givenName, sn, uid und ou gesucht.
   */
  search(filter: Filter): Promise<any> {
    const attributes = this.config.getLDAP('attributes');
    const transformer = { mapping: { list: 'res', item: this.config.getLDAP('mapping') }};

    return this.ldap.search(this.buildFilter(filter), attributes).then((res, rej) => {
      return transform({res: res}, transformer);
    });
  }

  /**
   * Baut aus den Werten eine UND-Verknüpften LDAP-Filter.
   * @param values Die Filterbelegung für die LDAP-Anfrage. Es wird nur nach givenName, sn, uid und ou gesucht.
   */
  buildFilter = (values: Filter): string => {
    let filter = '(&##)';
    if (values.vorname) {
      filter = filter.replace('##', `(givenName=*${values.vorname}*)##`);
    }
    if (values.nachname) {
      filter = filter.replace('##', `(sn=*${values.nachname}*)##`);
    }
    if (values.uid) {
      filter = filter.replace('##', `(uid=*${values.uid}*)##`);
    }
    if (values.ou) {
      filter = filter.replace('##', `(ou=*${values.ou}*)##`);
    }
    filter = filter.replace('##', '');

    return filter;
  }
}
