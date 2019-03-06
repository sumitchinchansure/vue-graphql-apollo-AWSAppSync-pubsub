<template>
  <div class="fromscript">
    <h1>This is an fromscript page</h1>

                <b-table
              :data="users"
              :bordered="false"
              :striped="true"
              :narrowed="false"
              :hoverable="true"
              :loading="false"
              :focusable="false"
              :mobile-cards="true"
            >
              <template slot-scope="props">
                <b-table-column field="username" label="Username">
                  {{ props.row.username }}
                </b-table-column>

                <b-table-column field="createdAt" label="CreatedAt">
                  {{ props.row.createdAt }}
                </b-table-column>
              </template>
            </b-table>
  </div>
</template>

<script>
import { listUsers, onCreateUser } from "../graphql";

export default {
  name: 'fromscript', 
  components: {
  },

  data () {
    return {
      msg: 'All Events',
      users: []
    }
  },

  apollo: {
    users: {
      query: () => listUsers,
      update: ({listUsers}) => listUsers.items,
      subscribeToMore: [{
        document: onCreateUser,
        updateQuery: (previous, {subscriptionData: {data: {onCreateUser}}}) => {
          console.log(onCreateUser)

          const listUsers = {
            ...previous.listUsers,
            items: [onCreateUser].concat(previous.listUsers.items)
          }

          return {listUsers}
        }
      }]
    }
  }


}
</script>