<template>
  <div class="apollo">
    <h1>This is an apollo page</h1>



      <ApolloQuery :query="queries.listUsers">

    <ApolloSubscribeToMore
      :document="subscriptions.onCreateUser"
      :updateQuery="onUserCreated"
    />

        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="loading" class="loading apollo">Loading...</div>

          <div v-else-if="error" class="error apollo">An error occured</div>

          <div v-else-if="data" class="result apollo">

            <b-table
              :data="data.listUsers.items"
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

          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>

  </div>
</template>

<script>
import { listUsers, onCreateUser } from "../graphql";

export default {
  name: "Apollo",
  data() {
    return {
      // Initialize your apollo data
      // listUsers: [],
      queries: {
        listUsers: listUsers
      },
      subscriptions: {
        onCreateUser: onCreateUser
      }
    }
  },
  methods: {

    onUserCreated (previousResult, { subscriptionData }) {
      const { onCreateUser } = subscriptionData.data.onCreateUser
      console.log(onCreateUser)

    }
  }
};
</script>
